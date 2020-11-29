//V11
const Discord = require('discord.js');

//NONAMEJS TARAFINDAN CODARE'YE VERİLMİŞTİR

exports.run = async (client, message, args) => {
  var embedov = new Discord.RichEmbed()
      .setDescription(`Komutlarımda \`\`top\`\` adında bir komut bulamadım! Komut listesine bakmak için: \`\`c!yardım\`\``)
  if(message.author.id !== "704668523552702514" || "651441308673638411") return message.channel.send(embedov)
                 if(isNaN(args[0])){
                   const embeds = new Discord.RichEmbed()
                   .setColor("RANDOM")
                   .setDescription("Lütfen Sayı Yaz!")
                   message.channel.send(embeds)
                 }else{

                   let icon = client.user.displayAvatarURL;
                  if (client.guilds.size < args[0]){
                   const embedss = new Discord.RichEmbed()
                   .setColor("RANDOM")
                   .setDescription("Bu Komutu Kullana Bilmek İçin Botun En Az "+args[0]+" Sunucuda Olması Lazım.")
                   message.channel.send(embedss)
                    message.channel.send()
                  }else{
                   
                   let content = "";
                   const top = client.guilds.sort((a,b)=>a.memberCount-b.memberCount).array().reverse()
                    for (let i = 0; i < args[0]; i++) {

                      content += `${i+1}. **${top[i].name}** ~ **${top[i].memberCount}** Kullanıcı Bulunmaktadır. \n`
                      }
                   const embed = new Discord.RichEmbed()
                   .setColor("RANDOM")           
                   .setTitle(`Botun Olduğu En İyi `+ args[0]+ ` Sunucu`)
                   .setThumbnail(icon)
                   .setDescription(content)
                   message.channel.send(embed);
                  }
                 }
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'top', 
  description: '',
  usage: 'top'
};
