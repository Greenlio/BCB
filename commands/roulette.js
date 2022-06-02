const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('hi '))return;   

  let user = message.author;

  function isOdd(num) { 
	if ((num % 2) == 0) return false;
	else if ((num % 2) == 1) return true;
}
    
let colour = args[0];
let cookiesdb = await db.fetch(`cookies_${message.guild.id}_${user.id}`)
let cookies = parseInt(args[1]);

let random = Math.floor(Math.random() * 37);

let cookieshelp = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`:x: Specify an amount to gamble | hi roulette <color> <amount>`);

let cookiesmore = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`:x: You are betting more than you have`);

let colorbad = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`:x: Specify a color | Red [1.5x] Black [2x] Green [15x]`);


    if (!colour)  return message.channel.send(colorbad);
    colour = colour.toLowerCase()
    if (!cookies) return message.channel.send(cookieshelp); 
    if (cookies > cookiesdb) return message.channel.send(cookiesmore);
    
    if (colour == "b" || colour.includes("black")) colour = 0;
    else if (colour == "r" || colour.includes("red")) colour = 1;
    else if (colour == "g" || colour.includes("green")) colour = 2;
    else return message.channel.send(colorbad);
    
    
    
    if (random == 0 && colour == 2) { // Green
        cookies *= 15
        db.add(`cookies_${message.guild.id}_${user.id}`, cookies)
        let cookiesEmbed1 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`:green_square: You won ${cookies} cookies\n\nMultiplier: 15x`);
        message.channel.send(cookiesEmbed1)
        console.log(`${message.author.tag} Won ${cookies} on green`)
    } else if (isOdd(random) && colour == 1) { // Red
        cookies = parseInt(cookies * 1.5)
        db.add(`cookies_${message.guild.id}_${user.id}`, cookies)
        let cookiesEmbed2 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`:red_square: You won ${cookies} cookies\n\nMultiplier: 1.5x`);
        message.channel.send(cookiesEmbed2)
    } else if (!isOdd(random) && colour == 0) { // Black
        cookies = parseInt(cookies * 2)
        db.add(`cookies_${message.guild.id}_${user.id}`, cookies)
        let cookiesEmbed3 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`:black_square_button: You won ${cookies} cookies\n\nMultiplier: 2x`);
        message.channel.send(cookiesEmbed3)
    } else { // Wrong
        db.subtract(`cookies_${message.guild.id}_${user.id}`, cookies)
        let cookiesEmbed4 = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`:x: You lost ${cookies} cookies\n\nMultiplier: 0x`);
        message.channel.send(cookiesEmbed4)
    }
}

  
  module.exports.help = {
    name:"roulette",
    aliases: ["roul"]
  }