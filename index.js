const fs = require("fs");
const Discord = require("discord.js");
const {
    token,
    prefix
} = require("./config.json");

const bot = new Discord.Client({
    ws: {
        intents: Discord.Intents.ALL
    }
})
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.once("ready", async () => {
    console.log(`${bot.user.tag} has completed all procedures and is now ready : Go squash those bugs and create more commands! ✅`);
});

bot.on("message", async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    //console.log(cmd, args)
    if (!bot.commands.has(cmd)) return;

    try {
        bot.commands.get(cmd).execute(message, args, bot);
    } catch (error) {
        console.error(error);
        message.reply('Looks like there was an error trying to execute the command, please contact Blinkzy#3819 👍');
    }
})
bot.login(token);