const Discord = require("discord.js")
const db = require("quick.db")
const ms = require('parse-ms')
let replik = ["Senqaii'nin Takıldığı Konuda Ona Yardımcı Oldun!", "Kodlama Derslierne Giderek Senqaii'yi Etkiledin!", "Botta Açık Buldun ve Senqaii'ye Söyledin!"]
var rep = replik[Math.floor(Math.random() * replik.length)];
exports.run = (client,message,args) => {
  let sure = db.fetch(`aldi_${message.author.id}`)
     let cd = 10800
      if (sure !== null && cd - (Date.now() - sure) > 0) {
        let timeObj = ms(cd - (Date.now() - sure))
      message.channel.send(`Daha önce para kazanmak için çalıştın! **${timeObj.hours} saat ${timeObj.minutes} dakika** sonra tekrar dene!`)
    } else {
        let i = Math.round(Math.random() * 120)
        db.add(`candypara_${message.author.id}`, i)
      message.channel.send( new Discord.RichEmbed() .setDescription(`${rep} Oda Sana ${i} Kadar Para Verdi!`))
      db.set(`aldi_${message.author.id}`, Date.now())
      
    }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["work"],
  permlvl: 0
}
exports.help = {
  name: "çalış",
  description: "sada",
  usage: "c!çalış"
}