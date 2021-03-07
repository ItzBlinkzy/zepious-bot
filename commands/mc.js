const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "mc",
    description: "Displays boosts and membercount",
    async execute(message, args, bot) {
        const memberCount = message.guild.memberCount
        const boosts = message.guild.premiumSubscriptionCount

        const Embed = new MessageEmbed()
        .setTitle(`${message.author.tag}, <3 cutie os`)
        .setDescription(`> *cuties*, ${memberCount}\n> *boosts*, ${boosts}`)
        .setColor("#000000")
        .setTimestamp()

        message.channel.send(Embed)
    }
}