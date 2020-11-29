const Discord = require("discord.js")

exports.run = (client,message,args) => {
  var dm = new Discord.RichEmbed()
  .setDescription(":x: **|**Bu Komutu DM'den Kullanamassın.!")
  if(!message.guild) return message.channel.send(dm)
   var üye = message.mentions.users.first() || message.author
    const şekeravatar = new Discord.RichEmbed()
    .setImage(message.guild.iconURL)
    .setFooter(message.author.username+" İstedi", message.author.avatarURL)
    message.channel.send(şekeravatar)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sunucu-foto", "sunucupp"],
  permlvl: 0
}
exports.help = {
  name: "sunucu-pp"
}