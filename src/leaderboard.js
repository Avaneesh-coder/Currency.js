const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

async function leaderboard(message) {
  if (!message) {
    throw new Error("Message is not given");
  }

  let data = await db.all();
  data = data.sort((a, b) => (a.data < b.data ? 1 : -1));
  let array = [];

  let count = 0;

  let length = data.length;

  if (length < 10) {
    length = 10;
  }

  for (var i = 0; i < data.length; i++) {
    if (data[i].ID.startsWith(`balance_${message.guild.id}`)) {
      let user = message.client.users.cache.get(data[i].ID.split("_")[2])
        .username;

      count++;
      array.push(`**[${count}]** ${user}: \`${data[i].data}\` Coins`);
    }
  }

  let embed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(array.join("\n"))
    .setThumbnail(message.guild.iconURL())
    .setTitle(`**${message.guild.name}**`);

  return message.channel.send(embed);
}

module.exports = leaderboard;
