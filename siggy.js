// Load required libraries
const Discord = require("discord.js");

// Load data to run bot
const { token,
	prefix
} = require("./config.json");

// Start up and log into Discord bot client
const client = new Discord.Client();

client.login(token);

// Displays to console when Siggy is ready to go
client.on("ready", () => {
    console.log("Music bot is ready!");
});