const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");
exports.run = async (bot, message, args,client) => {
   const seksizaman = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
   const istatistikler = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor('Candy', bot.user.avatarURL)
  .addField("» **Botun Sahibi**", "<a:candy_veriied:765185316393844806><@651441308673638411>| Senqaii#1903 ve <@704668523552702514> | Lrowx Creative#0001")
  .addField("»  **Geliştirici** ","<@651441308673638411> | <@704668523552702514>")
  .addField("» **Bellek kullanımı**", (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)  
  .addField("» **Çalışma süresi**", seksizaman)
  .addField("» **:busts_in_silhouette:Kullanıcılar**" , bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString(), true)
  .addField("» **:clipboard:Sunucular**", bot.guilds.size.toLocaleString(), true)
  .addField("» **<:candy_kanal:765187104236896318>Kanallar**", bot.channels.size.toLocaleString(), true)
  .addField("» **:cd:Discord.JS sürüm**", "v"+Discord.version, true)
  .addField("» **:cd:Node.JS sürüm**", `${process.version}`, true)
  .addField("» **<a:ping:765187306473652264>Ping**", bot.ping+" ms", true)
  .addField("» **CPU**", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
  .addField("» **Bit**", `\`${os.arch()}\``, true)
  .addField("» **İşletim Sistemi**", `\`\`${os.platform()}\`\``) 
  .addField("**» Bot Davet**", " [Davet Et](https://discord.com/oauth2/authorize?client_id=761318013512319027&permissions=8&scope=bot)", )
  .addField("**» Destek Sunucusu**", " [Sunucumuza Katıl](https://discord.gg/U4cnDVR)", )
//  .addField("**» Voteleme sayfası**", " [Botu votele]()", )
 return message.channel.send(istatistikler);
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [ 'i', ''],
  permLevel: 0
};

exports.help = {
  name: "istatistik",
  description: "Bot i",
  usage: "istatistik"
};