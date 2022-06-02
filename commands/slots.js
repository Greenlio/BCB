const slotItems = [":grapes:", ":watermelon:", ":tangerine:", ":apple:", ":seven:", ":strawberry:", ":cherries:"];
const db = require("quick.db");
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if(!message.content.startsWith('hi '))return;   

    let user = message.author;
    let cookiesdb = await db.fetch(`cookies_${message.guild.id}_${user.id}`)
    let cookies = parseInt(args[0]);
    let win = false;

    const cookiesmore = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`:x: You are betting more than you have (you got it twisted didn't you)`);

    const cookieshelp = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`:x: Specify an amount`);

    if (!cookies) return message.channel.send(cookieshelp);
    if (cookies > cookiesdb) return message.channel.send(cookiesmore);
    
    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        cookies *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        cookies *= 2
        win = true;
    }
    if (win) {
        const slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${cookies} cookies`)
            .setColor("RANDOM")
        message.channel.send(slotsEmbed1)
        db.add(`cookies_${message.guild.id}_${user.id}`, cookies)
    } else {
        const slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${cookies} cookies`)
            .setColor("RANDOM")
        message.channel.send(slotsEmbed)
        db.subtract(`cookies_${message.guild.id}_${user.id}`, cookies)
    }

}
  
  module.exports.help = {
    name:"slots",
    aliases: ["sl"]
  }