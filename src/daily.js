const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const ms = require("parse-ms");

async function daily(message) {
  if (!message) {
    throw new Error("Message is not given");
  }
  
  
  try {

  let cooldown = db.get(`cooldaily_${message.guild.id}_${message.author.id}`);

  if (cooldown !== null && 86400000 - (Date.now() - cooldown) > 0) {
    let time = ms(86400000 - (Date.now() - cooldown));

    let embed = new MessageEmbed()
      .setColor("YELLOW")
      .setDescription(
        `:timer: | You already collected your daily reward so, please wait for **${time.hours}** hour(s), **${time.minutes}** minute(s) and **${time.seconds}** second(s)`
      );

    return message.channel.send(embed);
  } else {
    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`:moneybag: | You got **50** coins as a daily reward.`)
     
      .setThumbnail(message.author.displayAvatarURL({ formate: "jpg" }));

    await db.add(`balance_${message.guild.id}_${message.author.id}`, 50);
    db.set(`cooldaily_${message.guild.id}_${message.author.id}`, Date.now());

    return message.channel.send(embed);
  }
    
  } catch(err) {
 return message.channel.send({embed: {"title": "Something went wrong !!", "description": err, "color": "RED"}})
  }
}

module.exports = daily;
