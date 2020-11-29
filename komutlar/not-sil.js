const Discord = require('discord.js');
const db = require("quick.db");
exports.run = (client, message, args) => {
  let mesaj = db.fetch(`nots_${message.author.id}`)
  if(!mesaj) return message.channel.send("Notun Yokki! :x:")
  db.delete(`nots_${message.author.id}`)

  const embed = new Discord.RichEmbed()
  .setDescription('Notların Silindi!')
   .setColor(0x36393E)
  message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["not-sil"],
  permLevel: 0
};
exports.help = {
  name: 'notsil',
  description: 'Özel komut.',
  usage: ''
};