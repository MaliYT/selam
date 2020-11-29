const Discord = require("discord.js")
const db = require("quick.db")

exports.run = (client,message,args) => {
  var user = message.mentions.users.first() || message.author
   var param = db.fetch(`candypara_${user.id}`)
  
  const Embed = new Discord.RichEmbed()
  .setTitle(client.emoji.verified+" | PROFİL")
  .addField(client.emoji.squad+" Hesap Sahibi:", `<@${user.id}>`)
  .addField(client.emoji.para+" Hesaptaki Para Miktarı:", param || 0)
  
  message.channel.send(Embed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["param", "profil"],
  permlvl: 0
}
exports.help = {
  name: "para",
  description: "para",
  usage: "c!para"
}