const Discord = require("discord.js")
const db = require("quick.db")

exports.run = (client,message,args) => {
  var dm = new Discord.RichEmbed()
  .setDescription(":x: **|**Bu Komutu DM'den Kullanamassın.!")
  if(!message.guild) return message.channel.send(dm)
  if(!message.member.hasPermissions("MANAGE_ROLES") || message.author.id !== "651441308673638411") return message.channel.send("`Rolleri Yönet` Yetkin Yok!")
  let enes = args[0]
  let şeker = message.mentions.channels.first().id
  
  if(!enes) return message.channel.send("Bir Fonksiyon Belirtmedin! `c!hg-bb ayarla/sıfırla`")
  //if(!şeker) return message.channel.send("Kanal Belirtmedin.!")
  if(enes == "ayarla") {
    const embed = new Discord.RichEmbed()
    .setDescription(client.emojis.get("762729253203607582")+" Başarıyla Kanal Ayarlandı!")
    message.channel.send(embed)
    db.set(`hgbb_${message.guild.id}`, şeker)
  }
  
  if(enes == "sıfırla") {
    message.channel.send(client.emojis.get("762729253203607582")+" Başarıyla Kanal Sıfırlandı.!")
    db.delete(`hgbb_${message.guild.id}`)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permlvl:0
}
exports.help = {
  name: "hg-bb"
}