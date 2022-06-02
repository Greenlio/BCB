const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('hi '))return;   

  let user = message.author;
  let timeout = 604800000;
  let amount = 100;

  let weekly = await db.fetch(`weekly_${message.guild.id}_${user.id}`);

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    let time = ms(timeout - (Date.now() - weekly));
  
    let timeEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`:x: already collected weekly cookies fat fucker\n\ncollect more in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    let moneyEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`:white_check_mark: collected greenlio's spare cookies of ${amount}`);
  message.channel.send(moneyEmbed)
  db.add(`cookies_${message.guild.id}_${user.id}`, amount)
  db.set(`weekly_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"weekly",
  aliases: ["week"]
}