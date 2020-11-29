const Discord = require('discord.js');
const client = new Discord.Client();
const db = require("quick.db")

exports.run = async (client, message, args) => {
   let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix || "c!" //! yerine prefixiniz
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first() 
  if (!args[0]) return message.reply('Kimi banlayacağını yazmalısın.!').catch(console.error);
  if (reason.length < 1) return message.reply('Ban sebebini yazmalısın.!');
  message.guild.ban(user, { reason: reason });
 // user.send(reason)
  message.channel.send("Kullanıcı başarıyla banlandı.")

  const embed = new Discord.RichEmbed()
    .setColor(0x000000)
    .setTimestamp()
    .setTitle("Banned!")
    .addField('Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Sebep', reason);
message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2,
  kategori: "mod"
};
exports.help = { 
	name: 'ban', 
	description: 'Belirttiğiniz kişiyi sunucudan banlarsınız.', 
	usage: 'ban' 
}