const Discord = require('discord.js');

const client = new Discord.Client();
const { token, prefix } = require("./config.json");

client.on('ready', () => {
    console.log("Music bot is ready!");
});

client.login(token);