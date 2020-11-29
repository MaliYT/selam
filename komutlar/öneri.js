const candy = require("discord.js")

exports.run = (client,message,args) => {
  if(!message.guild) return;
  let öner = args
  const a = new candy.RichEmbed()
  .setAuthor(message.author.tag,message.author.avatarURL)
  .addField("Öneri:", args)
  
  message.channel.send("<a:yehh:757282752105021581>")
  client.channels.get("740252124331376742").send(a)
  client.channels.get("740252124331376742").send("<@651441308673638411>")
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  permlvl: 0,
  aliases: []
}
exports.help = {
  name: "öneri"
}