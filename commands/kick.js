const Discord = require("discord.js")
module.exports = {
    name: "kick",
    description: "kick command",
    async execute(message, args, bot) {
        if (!args.length) return message.reply("No member specified");

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("You cannot kick people.")
        }
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I do not have the correct permissions to mute.")
        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        
        if (target.roles.highest.position > message.guild.me.roles.highest.position) {
                return message.channel.send('I cannot kick that user due to role hierarchy.');
        }
        if (!target) return message.channel.send("You need to tag the person you want to kick.")
        if (target.id === message.author.id) return message.channel.send("You cannot kick yourself.")

        let reason = args.slice(1).join(" ")
        if (!reason) reason = "~~None.~~"

        try {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Successfully kicked ${target.user.tag}`)
                .setColor('#000000')
                .addField(`Moderator:`, `> ${message.author.tag}`)
                .addField("Reason:", `> ${reason}`)
                .setThumbnail(message.author.displayAvatarURL())

            await target.kick()
            return message.channel.send(embed)
        } catch (err) {
            console.log(err)
            message.channel.send("Couldn't kick this user.")
        }
    }
}