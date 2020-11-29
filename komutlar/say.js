const a = require("discord.js")
const b = require("quick.db")

exports.run = (client,message,args) => {
if(!message.guild) return;
const say = new a.RichEmbed()
.setDescription("**"+message.guild.memberCount+" **")
message.channel.send("Üye Sayısı", {embed: say})
}
exports.conf = {
enabled: true,
guildOnly: false,
permlvl: 0,
aliases: ["count"]
}
exports.help = {
name: "say",
description: "",
usage: "!say"
}