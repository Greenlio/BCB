const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('hi '))return;   

  let user = message.author;

  let timeout = 86400000;
  let amount = 20;

  let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

  if (daily !== null && timeout - (Date.now() - daily) > 0) {
    let time = ms(timeout - (Date.now() - daily));
  
    const timeEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`chill out bruh ill give u more cookies wait for it xqcL\n\nget more in ${time.hours}h ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {
    const moneyEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`yoo heres some pocket change you poor rat\n\nu recieved ${amount} coins`);
  message.channel.send(moneyEmbed)
  db.add(`cookies_${message.guild.id}_${user.id}`, amount)
  db.set(`daily_${message.guild.id}_${user.id}`, Date.now())


  }
};


module.exports.help = {
  name:"daily",
  aliases: ["day"]
}