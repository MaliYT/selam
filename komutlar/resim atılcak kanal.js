const Discord = require("discord.js")
const db = require("quick.db")

exports.run = (client,message,args) => {
  if(!message.guild) return message.chanel.send(new Discord.RichEmbed() .setDescription(":x: | Bunu DM'den Kullanamassın!"))
 if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send(new Discord.RichEmbed() .setDescription("Bunu Yapmak İçin `Mesajları Yönet` Yetkinin Olması Lazım!"))
if(!args[0]) return message.channel.send(new Discord.RichEmbed() .setDescription(":x: | Bir Fonksiyon Belirt.!(ayarla)"))
let knl = message.mentions.channels.first()
let kanal = knl.id;
if(args[0] == "ayarla") {
if(!args[1]) return message.channel.send("Kanal Belirt.!")
  db.set(`resimk_${message.guild.id}`, kanal)
  message.channel.send(new Discord.RichEmbed() .setDescription(":white_check_mark: | Başarıyla Ayarlandı! \n *NOT: Sıfırlamak İçin Kanalı Silin!*"))
}
  if(args[0] == "sıfırla") {
    db.delete(`resimk_${message.guild.id}`)
      message.channel.send(new Discord.RichEmbed() .setDescription(":white_check_mark: | Başarıyla Sıfırlandı!"))
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permlvl: 0
}
exports.help = {
  name: "resim-kanal",
  description: "sas",
  usage: "sasa"
}