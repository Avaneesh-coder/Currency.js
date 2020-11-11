const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

async function pay(message, amount) {
  if (!message) {
    throw new Error("Message is not given");
  }

  let user = message.mentions.users.first();

  if (!user) {
    return message.channel.send({
      embed: {
        description: `**${message.author.username}**, Mention the Person who you want pay money!!`,

        color: "YELLOW"
      }
    });
  }
  
  if(user.bot) {
    return message.channel.send({
embed: {
  "color": "YELLOW",
  "description": "You are not allowed to pay to bots ;-; "
}})
  }

  if (!amount) {
    return message.channel.send({
      embed: {
        description: `**${message.author.username}**, You forget to give the amount of money that you want to transfer`,
        color: "YELLOW"
      }
    });
  }

  if (isNaN(amount)) {
    return message.channel.send({
      embed: {
        color: "RED",
        description: "Invalid Type of the amount!"
      }
    });
  }
  
  if(amount.includes("-")) {
     return message.channel.send({
      embed: {
        color: "RED",
        description: "You can not send money in negative amount."
      }
    });
  }

  let balance = db.get(`balance_${message.guild.id}_${message.author.id}`);

  if (balance < amount) {
    return message.channel.send({
      embed: {
        description: `You are missing **${amount -
          balance}** coin(s) to transfer money`,
        color: "YELLOW"
      }
    });
  }

  try {
    await db.subtract(
      `balance_${message.guild.id}_${message.author.id}`,
      amount
    );

    let embed = new MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(
        `You Payed **${amount}** coin(s) to **${user.username}**(\`${user.id}\`)`
      )
      .setColor("GREEN");

    await db.add(`balance_${message.guild.id}_${user.id}`, amount);
    return message.channel.send(embed);
  } catch (err) {
    return message.channel.send({
      embed: {
        title: "Something went wrong !!",
        description: err.toString(),
        color: "RED"
      }
    });
  }
}

module.exports = pay;
