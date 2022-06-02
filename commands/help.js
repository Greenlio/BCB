const Discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('hi '))return;   


    const embed = new Discord.MessageEmbed()
    .setTitle("Better Cookie Bot Help [Prefix \"hi \"]")
    .addField("Economy Commands", "`work` `beg` `rob` `pay` `balance` `withdraw` `deposit` `daily` `weekly`")
    .addField("Gamba Commmands", "`roulette` `slots`")
    .setColor("RANDOM")
    message.channel.send(embed)




}

module.exports.help = {
  name:"help",
  aliases: [""]
}