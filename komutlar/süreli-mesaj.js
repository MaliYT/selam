const Discord = require('discord.js');  const db = require('quick.db');
exports.run = async(client, message, args) => {
  if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send(":x: | Bunun İçin `Mesajları Yönet` Yetkinin Olması Lazım!")
  let msd = message.mentions.channels.first()
  let kanal = msd.id
  let mesaj = args
  if(!args[0]) return message.channel.send("Kanal Belirt.!")
  if(!args[1]) return message.channel.send("Mesaj Belirt.!")
  db.set(`süre_${message.guild.id}`, kanal)
  db.set(`süremsj_${message.guild.id}`, mesaj)
  message.channel.send(":white_check_mark: | Başarıyla Ayarlandı!")
};

exports.conf = {
  enabled: true, //Kod Aktif Olsunmu Olmasınmı Çalınsın/Çalışmasın false ise çalışmaz true ise çalışır eğer message.js de tanımı yoksa bi boka yaramaz: D
  guildOnly: false, //Sadece Sunucuda Çalışsın Dm Den Fln Çalışmasın O Mantık message.js Tanımı Yoksa Bi Boka Yarmaz vol2
  aliases: ["",""], // namedeki gibidir Sadece Başka Kullanımda Yapabilirsiniz. Kullanmak İstemiyorsanız [] Böyle Yapun
  permLevel: 0 //evelation yani mainden ayarlanıyor 0,1,2,3 Diye Devam Eder Sizde Farklı Olabilir client.evealationa Bakın permLevel Yada permlvl Olarak Ta Olabilir.
};

exports.help = {
  name: 'süreli-mesaj', // Komut İsmi 
  description: 'xxx', // Açıklaması
  usage: 'xxx' //Nasıl Kullanılır
};