const Discord = require("discord.js")
const db = require("quick.db")

exports.run = (client,message,args) => {

  if(message.guild.id !== "703610627301703790") return;
  if(!message.member.roles.has("740257704630812735")) return;
  let user = message.mentions.members.first() || message.author
  var data = db.get(`abonever_${user.id}`) || 0
  var büyükdata = db.get(`geneabone${message.guild.id}`)
  message.channel.send(new Discord.RichEmbed() .addField("Kullanıcı İsmi:", user) .addField("Verilen Abone Sayısı:", data) .setThumbnail(message.author.avatarURL) .addField("Sunucuda Toplam Verilen:", büyükdata)) || 0 
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["abonek","abonelerim","abonesasayısı","abone-sayısı"],
  permlvl: 0
}
exports.help = {
  name: "kayıtlar"
}