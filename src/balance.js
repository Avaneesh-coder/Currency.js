const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

function balance(message, id) {
  if (!message) {
    throw new Error("Message is not given");
  }

  if (!id) {
    id = message.author.id;
  } else {
 
    message.author = message.client.users.cache.get(id) || message.mentions.users.first()
    
    if(message.author.bot) {
      return message.channel.send({embed: {
        "description": "Bot are not allowed to have money ;-;",
        "color": "YELLOW"
      }})
    }
    id = message.author.id;
  }

  
  try {
  let database = db.get(`balance_${message.guild.id}_${id}`);
  

  if (!database) {
    database = 0;
  } 



  let embed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`**${message.author.username}**` + " have `" + `${database}` + "` coins", message.author.avatarURL())

    

  return message.channel.send(embed);
    
  } catch(err) {
    return message.channel.send({embed: {"title": "Something went wrong !!", "description": err, "color": "RED"}})
  }
}

module.exports = balance;
