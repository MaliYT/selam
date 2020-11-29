const Discord = require('discord.js');


exports.run = (client, message, params) => {
if(!message.member.permissions.has(8)) return;
        
        message.channel.send(':1234: **Sunucun için küçük bir altyapı hazırlanıyor!**');
        
          message.guild.createChannel('mod-log');
          message.guild.createChannel('log');
          message.guild.createChannel('giriş-çıkış');
          message.guild.createChannel('?kurallar?');
          message.guild.createChannel('?duyuru?');
          message.guild.createChannel('?video-paylaşım?');
          message.guild.createChannel('?sohbet?');
          message.guild.createChannel('?fotoğraf?');
          message.guild.createChannel('?bot-komutları?');
          message.guild.createChannel('?yetki̇li̇?');
       
        message.channel.send(':white_check_mark: **Herşey Kuruldu**');
        
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucu-kur"],
  permLevel: 3
};

exports.help = {
  name: 'sunucukur',
  description: 'Bot İçin gerekli kanlları kurar.',
  usage: 'r!kurulum'
};