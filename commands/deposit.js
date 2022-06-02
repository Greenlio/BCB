const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('hi '))return;   

  let user = message.author;
  let member = db.fetch(`cookies_${message.guild.id}_${user.id}`)
  let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

  if (args[0] == 'all') {
    let money = db.fetch(`cookies_${message.guild.id}_${user.id}`)
    if(money === 0) return message.channel.send("You dont have any cookies to deposit bruh")

    db.add(`bank_${message.guild.id}_${user.id}`, money)
    db.subtract(`cookies_${message.guild.id}_${user.id}`, money)
    
    message.channel.send(`You have deposited all your cookies (${money}) into the bank of pepeja, youre safe now`)
  
  } else {
  
    if(isNaN(args[0]))return;
  if (!args[0]) {
      return message.channel.send("u gotta tell me an ammount to deposit buddy :)")
      .catch(err => console.log(err))
  }

  if (message.content.includes('-')) { 
      return message.channel.send("negative cookies is that even possible u broke shithead")
  }


  if (member < args[0]) {
      return message.channel.send("cmeon u know u dont have that many cookies to deposit breh")
  }

  const embed5 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(`:white_check_mark: You have deposited ${args[0]} cookies into the bank`);

  message.channel.send(embed5)
  db.add(`bank_${message.guild.id}_${user.id}`, args[0])
  db.subtract(`cookies_${message.guild.id}_${user.id}`, args[0])
  }
}
module.exports.help = {
  name:"deposit",
  aliases: ["dep"]
}