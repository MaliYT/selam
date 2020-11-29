const Discord = require("discord.js")
const moment = require("moment")
exports.run = (client,message,args) => {
  var aktif = message.guild.members.filter(m => m.user.presence.status != "offline").size
  var inaktif = message.guild.members.filter(m => m.user.presence.status = "offline").size
  var dbd = message.guild.members.filter(m => m.user.presence.status = "dbd").size
  if(!message.guild) return message.author.send(new Discord.RichEmbed() .setDescription(":x: | DM'de Hangi Sunucuyu Göstereyim!"))
  let kur = {
			"01": "Ocak",
			"02": "Şubat",
			"03": "Mart",
			"04": "Nisan",
			"05": "Mayıs",
			"06": "Haziran",
			"07": "Temmuz",
			"08": "Ağustos",
			"09": "Eylül",
			"10": "Ekim",
			"11": "Kasım",
			"12": "Aralık"
    }
  const embed = new Discord.RichEmbed()
  .setThumbnail(message.guild.iconURL)
 .setTitle("Sunucu Bilgileri:")
  .addField(":clipboard:Sunucu İsmi:", message.guild, true)
  .addField(client.emoji.squad+"Sunucu Sahibi", "<@"+message.guild.ownerID+">")
  .addField(":busts_in_silhouette:Sunucu Üye Sayısı:", `${client.emoji.online} | Çevrimiçi: ${aktif} \n ${client.emoji.dbd} | Rahatsız Etmeyin: ${dbd} \n ${client.emoji.off} | Çevrimdışı: ${inaktif} \n :bust_in_silhouette: | Toplam: ${message.guild.memberCount}`, true)
  .addField("<:candy_kanal:765187104236896318> Kanal Sayısı:", message.guild.channels.size, true)
  .addField(":id: Sunucu İd:", message.guild.id, true)
  .addField("<a:wumpus:715564342824665169> Emojiler:", `Emojiler İçin **c!emojiler**`, true)
.addField(':globe_with_meridians:  Oluşturulma Tarihi', ` ${moment(message.guild.createdAt).format('DD')} ${kur[moment(message.guild.createdAt).format('MM')]} ${moment(message.guild.createdAt).format('YYYY h:mm:ss')}`, true)
  .addField(":octagonal_sign: Roller:", `:octagonal_sign: Rol Sayısı: ${message.guild.roles.size} `)//`\n :octagonal_sign: Roller: ${message.guild.roles.map(roles => `<@&${roles.id}>`).join(' ')}`)
  
  message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  aliases: ["sunucubilgi"],
  guildOnly: true,
  permLvl: 0
}
exports.help = {
  name: "sunucu-bilgi"
}