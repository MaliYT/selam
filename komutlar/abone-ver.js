const Discord = require("discord.js")
const db = require("quick.db")

exports.run = (client,message,args) => {

  if(message.guild.id !== "703610627301703790") return;
  if(!message.member.roles.has("740257704630812735")) return;
  if(!args[0]) return message.channel.send(":x: | Birini Etiketle.!")
  let rol = "740257710733525025"
  let user = message.mentions.members.first()
  user.addRole(rol)
  db.set(`abonever_${message.author.id}`, 1)
  db.set(`geneabone_${message.guild.id}`, 1)
  message.channel.send("<a:hypertada:703613559636099113> | Başarıyla Abone Rolü Verildi!")
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["abone"],
  permlvl: 0
}
exports.help = {
  name: "a"
}