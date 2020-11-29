const Discord = require("discord.js")
var ekle = "https://discord.com/oauth2/authorize?client_id=761318013512319027&permissions=8&scope=bot"
var destek = "https://discord.gg/U4cnDVR"

exports.run = async(client, message) => {
	var ooo = "https://cdn.discordapp.com/attachments/693502495833456681/761539444192706570/welovecandy.png"

	const embed = new Discord.RichEmbed()
  .setTitle(client.emojis.get("761531922798739466")+" **|**Candy Bot")
  .addField(client.emojis.get("715564342824665169")+"Davet Sistemi:", `**• |c!davet-ekle** : Davet Eklersiniz.
**• |c!davet-kanal** : Davet Kanalı Ayarlarsınız!
**• |c!davet-kanal-sıfırla** : Davet Kanalını Sıfırlarsınız!
**• |c!davet-oluştur** : Davet Oluşturursunuz!
**• |c!davet-sil** : Davet Silersiniz!
**• |c!davet-sıfırla** : Davetleri Sıfırlarsınız!
**• |c!davetler** : Davetlerinize Bakarsınız!`)
  .addField(client.emojis.get("762666196440973322")+"Linkler", `**__[Botu Ekle](${ekle})__ | __[Destek Sunucusu](${destek})__ **`)
  .setImage(ooo)
  .setColor("PİNK")
 // .setFooter("Candy Botu Eklemeyi Unutmayın c!davet")
  return message.channel.send(embed)
}



exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: `Geliştirici`
};

exports.help = {
  name: 'davet-sistemi',
  description: '[Admin Komutu]',
  usage: '!bakım-mod aç'
};