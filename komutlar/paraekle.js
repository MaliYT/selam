const Discord = require("discord.js")
const db = require("quick.db")

exports.run = (client,message,args) => {
  if(message.author.id !== "651441308673638411") return message.channel.send(":x: | Sen Bu Komutu Kullanamassın.!")
  if(!args[0]) return message.channel.send(`:x: | Bir Kullanıcı Etiketlemelisin.!`)
  if(!args[1]) return message.channel.send(`:x: | Para Miktarı Belirt.!`)
  let adam = message.mentions.users.first()
  let ekle = args[1]
  db.add(`candypara_${adam.id}`, ekle)
  message.channel.send(new Discord.RichEmbed() .setDescription(`${args[0]} Adlı Kişiye ${ekle} Kadar Para Ekledim!`))
  
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["paraekle", "paraekle"],
  permlvl: 6
}
exports.help = {
  name: "ekle",
  description: "eklee",
  usage: "c!ekle"
}