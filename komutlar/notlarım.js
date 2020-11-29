const Discord = require('discord.js');
const db = require("quick.db");
exports.run = (client, message, args) => {
let not = db.fetch(`nots_${message.author.id}`) || "Yok"
  let mesaj = args.slice(not).join('\n');
const embed = new Discord.RichEmbed()
  .setTitle("Notların")
  .setDescription(not)
   .setColor(0x36393E)
  message.channel.send(embed)
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'notlarım',
  description: 'Özel komut.',
  usage: ''
};