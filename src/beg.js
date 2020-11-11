const db = require("quick.db");
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");

async function beg(message) {
  if (!message) {
    throw new Error("Message is not given");
  }

  try {
    let cooldown = db.get(`coolbeg_${message.guild.id}_${message.author.id}`);

    if (cooldown !== null && 200000 - (Date.now() - cooldown) > 0) {
      let time = ms(200000 - (Date.now() - cooldown));

      let embed = new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(
          `:timer: | You already begged to someone so, please wait for **${time.minutes}** minute(s) and **${time.seconds}** second(s)`
        );

      return message.channel.send(embed);
    } else {
      let money = randomNumber(5, 12);
      let embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `:moneybag: | You got **${money}** coin(s) after begging.`
        );

      await db.add(`balance_${message.guild.id}_${message.author.id}`, money);
      db.set(`coolbeg_${message.guild.id}_${message.author.id}`, Date.now());

      return message.channel.send(embed);
    }
  } catch (err) {
    return message.channel.send({
      embed: {
        title: "Something went wrong !!",
        description: err,
        color: "RED"
      }
    });
  }
}

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = beg;
