const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('hi '))return;   

  let user = message.author;

  let timeout = 180000;
  let amount = 5;

  let beg = await db.fetch(`beg_${message.guild.id}_${user.id}`);

  if (beg !== null && timeout - (Date.now() - beg) > 0) {
    let time = ms(timeout - (Date.now() - beg));
  
    const timeEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(` you've already begged greenlio in the past few minutes pls wait before begging again and get a job u broke fuck\n\nBeg again in ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    const moneyEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(` you begged greenlio (or atleast an ai version of them) and they were kind enough to give u some, you received ${amount} cookies`);
  message.channel.send(moneyEmbed)
  db.add(`cookies_${message.guild.id}_${user.id}`, amount)
  db.set(`beg_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"beg",
  aliases: [""]
}