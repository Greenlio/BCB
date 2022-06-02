const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {
  if(!message.content.startsWith('hi '))return;   

const user = message.mentions.members.first()
if(!user) {
  message.reply('mention someone mr robber sir')
}
const targetuser = await db.fetch(`cookies_${message.guild.id}_${user.id}`)
const author = await db.fetch(`rob_${message.guild.id}_${user.id}`)
const author2 = await db.fetch(`cookies_${message.guild.id}_${message.author.id}`)

const timeout = 600000;
const chance = Math.floor(Math.random() * 3);
if (author !== null && timeout - (Date.now() - author) > 0) {
    let time = ms(timeout - (Date.now() - author));

    const timeEmbed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`mr robber u have already robbed someone pls take a chill pill\n\nTry again in ${time.minutes}m ${time.seconds}s `);
    message.channel.send(timeEmbed)
  } else {

const cookieEmbed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(` you need atleast 50 cookies to rob someone bruh`);

if (author2 < 50) {
    return message.channel.send(cookieEmbed)

}
const cookieEmbed2 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(` ${user.user.username} is broke af he doesnt have any cookies for u to rob, feelsbadman`);
if (targetuser < 0) {
    return message.channel.send(cookieEmbed2)
}

const lost = Math.floor(Math.random() * author2)
const cookieEmbed3 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setDescription(` you lost and got caught by the cops, you lost ${lost} cookies`);
if(chance == 3) {
  db.subtract(`cookies_${message.guild.id}_${message.author.id}`, lost)
  db.set(`rob_${message.guild.id}_${user.id}`, Date.now())
  return message.channel.send(cookieEmbed3)
}
let vip = await db.fetch(`bronze_${message.author.id}`)
if(vip === true) random = Math.floor(Math.random() * 200) + 1;
if (vip === null) random = Math.floor(Math.random() * 100) + 1;

const embed = new Discord.MessageEmbed()
.setDescription(` You robbed ${user} and got away with ${random} cookies, nice man`)
.setColor("RANDOM")
message.channel.send(embed)

db.subtract(`cookies_${message.guild.id}_${user.id}`, random)
db.add(`cookies_${message.guild.id}_${message.author.id}`, random)
db.set(`rob_${message.guild.id}_${message.author.id}`, Date.now())
  
};
}

module.exports.help = {
  name:"rob",
  aliases: [""]
}