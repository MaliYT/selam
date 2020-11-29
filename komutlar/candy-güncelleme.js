const a = require("discord.js")
const b = require("quick.db")
const hook = new a.WebhookClient('780769546607919104', 'O-Mt4IQHlA-f88hff_3AF8aA8dKneGuPWkD8L3u1sVJN9e7S8FReah_XJX5H33TssmFI');
exports.run = (client,message,args) => {
if(!message.guild) return;
  var embed = new a.RichEmbed()
      .setDescription(`Komutlarımda \`\`güncelleme\`\` adında bir komut bulamadım! Komut listesine bakmak için: \`\`c!yardım\`\``)
     let aa = args.slice(0).join(" ")
  if(message.author.id !== "651441308673638411") return message.channel.send(embed)
const h = new a.RichEmbed()
.setAuthor("Candy Bot Güncelleme", client.user.avatarURL)
.addField("Detaylar:", aa)
.setFooter(`c!öneri - Komut Önerin`)
hook.send(h)
}
exports.conf = {
enabled: true,
guildOnly: false,
permlvl: 0,
aliases: []
}
exports.help = {
name: "güncelleme",
description: "",
usage: "!candy"
}