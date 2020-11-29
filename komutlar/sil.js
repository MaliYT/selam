const Discord = require('discord.js');





exports.run = function(client, message, args) {

  if(!message.member.hasPermissions("MANAGE_MESSAGES")) return message.channel.send(":x: | Bunun İçin `Mesajları Yönet` Yetkinin Olması Lazım!")
  
  const sayi = args.slice(0).join('');

  

if(!args[0]) {

  return message.reply("Silmem İçin Bir Miktar Belirt")

} else {
if(sayi>100) return message.channel.send(new Discord.RichEmbed() .setDescription(":x: | O Kadar Mesaj Silemem"))
  message.channel.bulkDelete(sayi);

  var emboş = new Discord.RichEmbed()
  .setDescription("<a:trashgif:752880161879490650> | **" + sayi + "** mesaj sildim")
message.channel.send(emboş).then(msg => {

	msg.delete(5000)

});

}





};



exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["sil"],
  permLevel: 0 
};



exports.help = {
  name: 'sil', 
  description: 'Belirtilen miktarda mesaj siler',
  usage: 'temizle <miktar>'

};