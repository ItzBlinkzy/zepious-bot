const {MessageEmbed} = require("discord.js")
module.exports = {
    name: "say",
    description: "say command",
    async execute(message, args, bot) {
        await message.delete()
        let welcomeMessage = args[0]
        if (!welcomeMessage) welcomeMessage = "** **"
        message.channel.send(new MessageEmbed()
        .setTitle(`${message.author.tag}, <3 cutie os`)
        .setDescription(`> ${message.content}`)
        .setColor("#000000")
        .setThumbnail(message.author.displayAvatarURL())
        .setTimestamp())
    }
}