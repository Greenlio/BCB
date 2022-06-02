const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('hi '))return;   
  if(!message.author.id == '239827986709217281')return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`cookies_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`cookies_${message.guild.id}_${user.id}`)

    const cookieEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`:white_check_mark: Removed ${args[1]} cookies\n\nNew Balance: ${bal}`);
    message.channel.send(cookieEmbed)

};


module.exports.help = {
  name:"remove",
  aliases: ["rm"]
}
