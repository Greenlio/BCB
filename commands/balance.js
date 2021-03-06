const Discord = require("discord.js");
const db = require("quick.db");
const bot = new Discord.Client({disableEveryone: true});


module.exports.run = async (bot, message, args, utils) => {
  if(!message.content.startsWith('hi '))return;   

  let user = message.mentions.members.first() || message.author;

  let bal = db.fetch(`cookies_${message.guild.id}_${user.id}`)

  if (bal === null) bal = 0;

  let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
  if (bank === null) bank = 0;
  message.channel.send(`**${user}'s Cookies**\n\nCookies: ${bal}\nCookies in Bank of Pepeja: ${bank}`)
};

module.exports.help = {
  name:"balance",
  aliases: ["bal"]
}
