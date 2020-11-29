const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const yazi = args.slice(0).join('+'); 

  if(!yazi) return message.channel.send(`Lütfen yazı yazın!`)
  const linqo = `https://habbofont.net/font/habboclub/${yazi}.gif`
  .replace(" ", '+')

  
  const embed = new Discord.RichEmbed()
  .setTitle("İşte Logo'n!")
  .setColor("#2ECC71")
  .setImage(linqo)
  .setFooter('Logo Oluşturuldu!')
  message.channel.send(embed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
}

exports.help = {
    name: 'altınlogo',
    description: 'Yazdığınız yazıyı Logoya çevirir.',
    usage: 'gaminglogo <yazı>'
}