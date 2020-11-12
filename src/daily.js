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
    let jean = randomNumber(2000, 5000);
    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`:moneybag: | You got **` + jean + `** coins as a daily reward.`)
      .setThumbnail(message.author.displayAvatarURL({ formate: "jpg" }));

    await db.add(`balance_${message.guild.id}_${message.author.id}`, jean);
    db.set(`cooldaily_${message.guild.id}_${message.author.id}`, Date.now());

    return message.channel.send(embed);
  }
    
  } catch(err) {

 return message.channel.send({embed: {"title": "Something went wrong !!", "description": err, "color": "RED"}})
  }

  function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = daily;