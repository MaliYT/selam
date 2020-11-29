const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const weather = require("weather-js");
const fs = require("fs");
const db = require("quick.db");
const http = require("http");
const express = require("express");
require("./util/eventLoader")(client);
const path = require("path");
const request = require("request");
const snekfetch = require("snekfetch");
const queue = new Map();
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");

//ayarla bot---------
client.ayarlar = {
  "sahip": "651441308673638411",
  "sahip2": "704668523552702514",
  "prefix": "c!",
  "destek": ""
}

//------------------------------------
client.botdavet = {
  ekle: "https://discord.com/oauth2/authorize?client_id=761318013512319027&permissions=8&scope=bot",
  destek: "https://discord.gg/U4cnDVR",
  oyver: ""
}
//-------------------emojiler------------------
client.emoji = {
  katıldım: "<a:candy_katld:765189114302562338>",
  ayrıldım: "<a:candy_ayrld:765189147341750295>",
  verified: "<a:candy_veriied:765185316393844806>",
  squad: "<a:squad:715563672503582770>",
  online: "<:candy_online:766319676116172841>",
  dbd: "<:candy_dbd:766319728960471050>",
  off: "<:candy_offline:766319830630006785>",
  para: "<:candy_para:767790525557506078>",
  hayır: "<a:no:759123556213850132>",
  evet: "<a:yes:759118969742688286>",
  kızgın: "<a:candy_kzgn:780479328152584202>"
}
//---------------------------------------------
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

client.on("guildMemberRemove", async member => {
  //let resimkanal = JSON.parse(fs.readFileSync("./ayarlar/gç.json", "utf8"));
  //const canvaskanal = member.guild.channels.get(resimkanal[member.guild.id].resim);
  
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.get(db.fetch(`gçkanal_${member.guild.id}`));
  if (!canvaskanal) return;

  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucudan Ayrıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/Wrn1XW.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "ro-BOT-güle-güle.png"
  );

    canvaskanal.send(attachment);
    canvaskanal.send(
      msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
    );
    if (member.user.bot)
      return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
  
});

client.on("guildMemberAdd", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.get(db.fetch(`gçkanal_${member.guild.id}`));

  if (!canvaskanal || canvaskanal ===  undefined) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucuya Katıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://i.hizliresim.com/UyVZ4f.jpg"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#D3D3D3`;
  ctx.font = `37px "Warsaw"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.avatarURL || member.user.defaultAvatarURL;
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.Attachment(
    canvas.toBuffer(),
    "ro-BOT-hosgeldin.png"
  );

  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
});

client.on('message', async message => {
if (message.content === 'c!fakekatıl') {
  message.reply(":white_check_mark:")// . yerine prefixi yaz
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});
client.on('message', async message => {
if (message.content === 'c!fakesunucu') {
  message.reply(":white_check_mark:")// . yerine prefixi yaz
  client.emit('guildCreate', message.guild);
    }
});
//otorol
client.on('guildMemberAdd', async (member, guild, message) => {
 
let role = db.fetch(`otorolisim_${member.guild.id}`)
 let otorol = db.fetch(`autoRole_${member.guild.id}`)
 let i = db.fetch(`otorolKanal_${member.guild.id}`)
 if (!otorol || otorol.toLowerCase() === 'yok') return;
else {
 try {
 
 
  if (!i) return
if (!role) {
  member.addRole(member.guild.roles.get(otorol))
                        var embed = new Discord.RichEmbed()
                        .setDescription("**<a:749218703345975347:749218703345975347>Sunucuya Yeni Katılan** @" + member.user.tag + " **Kullanıcısına** <@&" + otorol + ">  **Rolü verildi.**")
                        .setColor('0x36393E')
                       // .setFooter(`Otorol Sistemi`)
     member.guild.channels.get(i).send(embed)
} else if (role) {
    member.addRole(member.guild.roles.get(otorol))
                        var embed = new Discord.RichEmbed()
                        .setDescription(`**<a:749218703345975347:749218703345975347> | Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi.**`)
                        .setColor('0x36393E')
                        //.setFooter(`Otorol Sistemi`)
     member.guild.channels.get(i).send(embed)
 
}
 
 } catch (e) {
 console.log(e)
}
}
 
  //gelen giden embed
});
client.on(`guildMemberAdd`, async member => {
var maze = new Discord.RichEmbed()
.setColor("GREEN")
.setTitle("<a:katildi:749218703345975347> Sunucuya yeni bir üye katıldı!")
.setThumbnail(member.user.avatarURL)
.setDescription("Hoşgeldin "+ member +"! Seninle beraber "+ member.guild.memberCount+" kişiye ulaştık.")
.addField(`:id: Üye ID:`, `${member.id}`, true)
.addField(`<a:squad:715563672503582770> Üye Adı`, `${member}`, true)
//client.channels.get(await db.fetch(`hgbb_${member.guild.id}`)).send(maze) 
});

let mesaj = "765123008184057877"
const yourID = ""; //Instructions on how to get this: https://redd.it/40zgse //Kendi İD'nizi Yazın
const setupCMD = "" //İstediğiniz Komut Yapabilirsiniz örn : !kayıtol
let initialMessage = ``; //Dilediğiniz Şeyi Yazabilirsiniz
const roles = ["", ""]; //İstediğiniz Rolü Yazabilirsiniz
const reactions = ["", ""]; //İstediğiniz Emojiyi Ekleyebilirsiniz
const botToken = "";  //Buraya botunuzun tokenini koyunuz
                     

//Load up the bot...
const discord = require('discord.js');
const bot = new Discord.Client();
//bot.login(botToken);

//If there isn't a reaction for every role, scold the user!
if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";

//Function to generate the role messages, based on your settings
function generateMessages(){
    var messages = [];
    messages.push(initialMessage);
    for (let role of roles) messages.push(`Kayıt Olmak İçin **"${role}"** Emojisine Tıkla!`); //DONT CHANGE THIS
    return messages;
}


bot.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){
        var toSend = generateMessages();
        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];
        for (let mapObj of mappedArray){
            message.channel.send(mapObj[0]).then( sent => {
                if (mapObj[1]){
                  sent.react(mapObj[1]);  
                } 
            });
        }
    }
})


const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {
	if (!events.hasOwnProperty(event.t)) return;
	const { d: data } = event;
	const anto = client.users.get(data.user_id);
	const channel = client.channels.get(data.channel_id) || await anto.createDM();
	if (channel.messages.has(data.message_id)) return;
	const message = await channel.fetchMessage(data.message_id);
	const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
	const reaction = message.reactions.get(emojiKey);
	client.emit(events[event.t], reaction, anto);
});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.message.id == "765123008184057877") {//Geçerli olması istediğiniz mesajın ID'sini yazabilirsiniz.
    if (reaction.emoji.name == "757282752105021581") {//Dilediğini emojiyi koyabilirsiniz.
      reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', '👕 | Üye'))//Dilediğiniz rolün adını yazabilirsiniz.
	}
  }
  if(reaction.message.id == "766338681820676107") {
	if (reaction.emoji.id == "763439354671661066") {//Dilediğiniz emojiyi koyabilirsiniz.
	  reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Kod Ping'))//Dilediğiniz rolün adını yazabilirsiniz.
	}
  
	if (reaction.emoji.id == "764163351210360834") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Partner Ping'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
}
    if(reaction.message.id == "775355454392893462") {
    	if (reaction.emoji.id == "705417184603537500") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', '🏷️┊Üye'))
        user.send(":white_check_mark:┊Başarıyla Kayıt Olundu!")//Dilediğiniz rolün adını yazabilirsiniz..then(msg => msg.author.send(":white_check_mark:┊Başarıyla Kayıt Olundu!")
	  }
  if (reaction.emoji.id == "705417184603537500") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Kayıtsız'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
  }
      if(reaction.message.id == "775720142017265674") {
    	if (reaction.emoji.id == "765161067948408852") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Kod Ping'))
     //Dilediğiniz rolün adını yazabilirsiniz..then(msg => msg.author.send(":white_check_mark:┊Başarıyla Kayıt Olundu!")
	  }
  if (reaction.emoji.id == "765161067948408852") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Kod Ping'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
  }
        if(reaction.message.id == "775720142017265674") {
    	if (reaction.emoji.id == "765187104236896318") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).addRole(reaction.message.guild.roles.find('name', 'Altyapı Ping'))
     //Dilediğiniz rolün adını yazabilirsiniz..then(msg => msg.author.send(":white_check_mark:┊Başarıyla Kayıt Olundu!")
	  }
  if (reaction.emoji.id == "765187104236896318") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Altyapı Ping'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
  }
  }
);


client.on('messageReactionRemove', (reaction, user) => {
	if (reaction.message.id == "MesajID") {//Geçerli olması istediğiniz mesajın ID'sini yazabilirsiniz.
	  if (reaction.emoji.name == "Emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rol'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
	  if (reaction.emoji.name == "Emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rol'))//Dilediğiniz rolün adını yazabilirsiniz.
	  }
	  if (reaction.emoji.name == "Emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		  reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rol'))//Dilediğiniz rolün adını yazabilirsiniz.
		}
     if (reaction.emoji.name == "Emoji") {//Dilediğiniz emojiyi koyabilirsiniz.
		  reaction.message.guild.members.get(user.id).removeRole(reaction.message.guild.roles.find('name', 'Rol'))//Dilediğiniz rolün adını yazabilirsiniz.
		}
	}
  });
 exports.run = (message) => {
   let kanal = db.fetch(`süre_${message.guild.id}`)
   let mesaj = db.fetch(`süremsj_${message.author.id}`)
setInterval(() => {
  client.channels.get(kanal).send(mesaj)
}, 60000)
 }
 //------------------snipe----------------
 client.on('messageDelete', message => {
  db.set(`snipe.mesaj.${message.guild.id}`, message.content)
  db.set(`snipe.id.${message.guild.id}`, message.author.id)
})
//-----------------------------------------
//----------------kanala resim atılması sağlamak-
/*
client.on("message", m => {
  let kanall = db.fetch(`resimk_${m.guild.id}`)
  if (m.channel.id !== kanall) { //buraya o kanalın ID'si yazılacak.
    return;
  }
  if (m.author.id === m.guild.ownerID) return;
  if (m.attachments.size < 1) {
    m.delete();
  }
}); */
/*
//--------------------------------------------------
//-------------sunucuya girince kanal oluşturup içine mesaj atma-------------
client.on("guildCreate", guild => {
  	const embed = new Discord.RichEmbed()
  .setTitle(client.emojis.get("761531922798739466")+" **|**Candy Bot Komutlar")
  .addField(client.emojis.get("761548355511517227")+"Moderasyon Komutları:", "`c!moderasyon`",true)
  .addField(client.emojis.get("761549019792146462")+"Eğlence Komuları:", "`c!eğlence`",true)
  .addField(client.emojis.get("761548633564774401")+"Diğer Komutlar:", "`c!diğer`",true)
  .addField(client.emojis.get("765161067948408852")+"Logo Komutları:", "`c!logo`", true)
.setDescription(client.emoji.katıldım+" | Beni Eklediğiniz İçin Teşekkür Ederim!")
  .setColor("PİNK")
 guild.channels.create(`「📜」candy-bot-bilgi`, {type : "text"})
    .then(channel => channel.send(embed))
})*/
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});/*
client.on("guildCreate", guild => {
  let kurucu = client.users.get(guild.ownerID)
  const log = "778919388057174017"
  var katıldım = new Discord.RichEmbed()
  .setColor("GREEN")
  .setTitle(client.emoj.katıldım+" | Bir Sunucuya Katıldım!")
  .addField("<a:squad:772453704455946241> | Sunucu Sahibi:", kurucu, true)
  .addField(":busts_in_silhouette: | Kullanıcı Sayısı:", guild.memberCount, true)
  .addField("<:candy_kanal:765187104236896318> | Kanal Sayısı:", guild.channels.size, true)
  .addField(`-----------------------------------------------`, `Toplamda ${client.guilds.size} Sunucu ve ${client.users.size} Kullanıcıya Hizmet Veriyorum!`)
client.channels.get(log).send(katıldım)
  })
client.on("guildDelete", guild => {
  let kurucu = client.users.get(guild.ownerID)
  const log = "778919388057174017"
  var katıldım = new Discord.RichEmbed()
  .setTitle(client.emoj.ayrıldım+" | Bir Sunucudan Ayrıldım!")
  .addField("<a:squad:772453704455946241> | Sunucu Sahibi:", kurucu, true)
  .addField(":busts_in_silhouette: | Kullanıcı Sayısı:", guild.memberCount, true)
  .addField("<:candy_kanal:765187104236896318> | Kanal Sayısı:", guild.channels.size, true)
  .setColor("RED")
  .addField(`-----------------------------------------------`, `Toplamda ${client.guilds.size} Sunucu ve ${client.users.size} Kullanıcıya Hizmet Veriyorum!`)
client.channels.get(log).send(katıldım)
  })

*/






client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı :outbox_tray: \nŞahsı davet eden:** \`\`Bulunamadı\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    return;
  } else {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı kişi aramızdan ayrıldı :outbox_tray: \nŞahsı davet eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);

    if (!veri) return;

    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.removeRole(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.removeRole(veri2);
        return;
      }
    }
  }
});
///////////////////HG////////////////////////////
client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id) || null
    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs sunucuya katıldı :inbox_tray: \nŞahsı davet eden:** \`\`${davetçi.tag}\`\`\n**Toplam \`\`${sayı2}\`\` daveti oldu :tada:**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.addRole(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.addRole(veri2);
        return;
      }
    }
  });
});
// MUTE
client.on('guildMemberAdd', async(member) => {
  const ms = require("ms")
 let mute = member.guild.roles.find(r => r.name === "Muted");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.addRole(mute.id)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.removeRole(mute.id);
  }, ms(süre));
}
})
client.on('guildCreate', guild => {
if(guild.memberCount > 2) return guild.leave()
})
