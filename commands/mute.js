const ms = require("ms")
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    "name": "mute",
    "description": "mute people",
    async execute(message, args, bot) {
        if (!args) return message.reply("No time or reason specified.");
        let moderator = message.author.tag
        let time = args[1]
        if (!ms(time)) return message.channel.send("No time provided.")
        let reason = args.slice(2).join(" ")
        console.log(reason)
        if (!reason) {
            return message.reply("No reason specified.");
        }
        let target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have the correct permissions to mute.")
        if (!target) return message.reply("Couldn't find user.");
        let muterole = message.guild.roles.cache.find(roles => roles.name.toLowerCase() === "muted")

        if (target.roles.cache.has(muterole.id)) {
            return message.reply("That user is already muted!")
        }
        
        if (!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "muted",
                    color: "#000000",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                console.log(e);
            }
        }
        await target.roles.add(muterole.id); // MUTED THEM
        const embed = new MessageEmbed()
            .setTitle(`${target.user.tag} was muted.`)
            .addField("Muted By:", message.author.tag)
            .addField("Time", `> ${time}`)
            .setColor("#000000")
            .addField('Reason: ', `> ${reason}`)

        message.channel.send(embed)

        try {
            target.send(new MessageEmbed()
                .setTitle(`You were muted by ${moderator}`)
                .addField("For the reason: ", `> ${reason}`)
                .addField("Time", `> ${time}`)
                .setColor("#000000")
                .setTimestamp())
        } catch (err) {
            message.channel.send("Unable to DM user about the moderation action. [probably disabled by them]")
            console.error(err)
        }
        setTimeout(async () => {
            await target.roles.remove(muterole.id)
            console.log(`Successfully removed mute role from ${target.user.tag}.`)
        }, ms(time))
    }
}