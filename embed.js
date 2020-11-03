// Load required libraries
const Discord = require("discord.js");

const help = new Discord.MessageEmbed()
    .setColor("#000000")
    .setTitle("Help Manual for SiggyBot")
    .setDescription("SiggyBot will play your signature song")
    .setThumbnail("https://scontent-lax3-2.xx.fbcdn.net/v/t1.15752-9/82016613_1518447688294795_5932471724183388160_n.png?_nc_cat=107&_nc_ohc=LRbLCYFiQ4kAQmJc2u5KUUeuHngn24i7B_ARkuZ1fY6QC84VmkQhFB60A&_nc_ht=scontent-lax3-2.xx&oh=a53ca8c67cc689a3508fc94015525047&oe=5EA226F4")
    .addField("?help", "Show this message.")
    .addField("?intro YouTubeURL", "ie. ?intro https://youtu.be/wWTgNQN1r0s\nClips 0:00-0:05.")
    .addField("?intro YouTubeURL duration", "ie. ?intro https://youtu.be/wWTgNQN1r0s?t=6 10 \nClips 0:06-0:16.");

const download = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Downloading...");

const complete = new Discord.MessageEmbed()
    .setColor("#00FF00")
    .setTitle("Download Complete. Your clip will play when you join a Voice Channel.");

const error = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Download failed. Try again. If problem persists, message WindTa#3455.");

module.exports = { help, download, complete, error };