const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');
const ms = require('parse-ms')
 
exports.run = async (client, message, args) => {
 
let cd = 10800
var kisi = message.mentions.users.first()
let sure = await db.fetch(`aldic_${message.author.id}`)
     
      if (sure !== null && cd - (Date.now() - sure) > 0) {
        let timeObj = ms(cd - (Date.now() - sure))
      message.channel.send(`Daha önce para çaldın! **${timeObj.hours} saat ${timeObj.minutes} dakika** sonra tekrar dene!`)
    } else {
     
   if(!kisi) return message.reply('Birini Etiketlemelisin!')
 
  if (kisi.bot) return message.reply("Bottan para çalacak kadar fakir misin?!")
  if (db.fetch(`candypara_${kisi.id}`) <= '0') return message.reply("Olamaz! Kullanıcının Hiç Parası Yok Başka Birini Dene!")
  if (message.author.id === kisi.id) return message.reply("Kendinden Para Çalamazsın!")
  if (300 > db.fetch(`candypara_${kisi.id}`)) return message.reply("Kullanıcının Parası Çok Az!")
  if (db.has(`candypara_${kisi.id}`) === false) return message.reply("Olamaz! Kullanıcının Hiç Parası Yok Başka Birini Dene!")
 
   let i = Math.round(Math.random() * 120)
   
  db.subtract(`para_${kisi.id}`, i)
  db.add(`candypara_${message.author.id}`, i)
   
  message.channel.send('`'+i +"` Para Çaldın!")
       
  db.set(`aldic_${message.author.id}`, Date.now())
      }
  }
 
exports.conf = {
  aliases: ["çal"],
  permLevel: 0
};
 
exports.help = {
  name: 'para-çal'
};