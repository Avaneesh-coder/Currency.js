const db = require("quick.db");
const ms = require("parse-ms");
const { MessageEmbed } = require("discord.js");
let working = [
  "Developer",
  "Gamer",
  "Trainer",
  "Clown",
  "Youtuber",
  "Animator",
  "Hero",
  "Host",
  "Plumber",
  "Assistant",
  "Research Engineer",
  "Teacher",
  "Service Manager",
  "Creative Director",
  "Fashion Stylist",
  "Art Director"
];

function work(message) {
  if (!message) {
    throw new Error("Message is not given");
  }

  
  try {
  const user = message.author;

  let cooldown = db.get(`coolwork_${message.guild.id}_${user.id}`);

  if (cooldown !== null && 600000 - (Date.now() - cooldown) > 0) {
    let time = ms(600000 - (Date.now() - cooldown));

    let embed = new MessageEmbed()
      .setColor("YELLOW")
      .setDescription(
        `:timer: | You must be tired so, please wait for **${time.minutes}** minutes and **${time.seconds}** seconds`
      )
    

    return message.channel.send(embed);
  } else {
    let workin = randomNumber(0, working.length - 1);
    let money = randomNumber(0, 100);
    let embed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(
        `You worked as **${working[workin]}** and earned **${money}** coin(s)`
      )
      .setThumbnail(message.author.displayAvatarURL({ formate: "jpg" }));
    db.set(`coolwork_${message.guild.id}_${user.id}`, Date.now());

    db.add(`balance_${message.guild.id}_${user.id}`, money);

    return message.channel.send(embed);
  }
} catch(err) {
  return message.channel.send({embed: {"title": "Something went wrong !!", "description": err, "color": "RED"}})
}
}

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = work;
