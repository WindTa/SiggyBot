const Discord = require('discord.js');

const client = new Discord.Client();
const { token, prefix } = require("./config.json");

// Function to pull ID of a YouTube video
function youtube_parser(url){
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match&&match[1].length==11)? match[1] : false;
}

client.on("ready", () => {
    console.log("Music bot is ready!");
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        // Returns if message starts with wrong prefix or is sent from a bot
        return;
    }

    let splitMessage;
    if (message.content.startsWith(prefix + "help")) {
        // Prints commands to Discord channel
        message.channel.send("\tSiggy is trying to display the list of commands");
        return;
    } else {
        // Notifies user of invalid command due to arguments
        splitMessage = message.content.split(" ");
        if (splitMessage.length < 2) {
            message.channel.send("\tSiggy is not receiving enough arguments for the command. Type ?help for more details.");
            return;
        }
    }

    if (message.content.startsWith(prefix + "intro")) {
        // Updates the messenger's intro song.
        message.channel.send("\tSiggy updated " + message.author.username + "'s intro to " + message.channel.name)
    }

    if (message.content.startsWith(prefix + "outro")) {
        // Updates the messenger's outro song.
        message.channel.send("\tSiggy updated " + message.author.username + "'s outro to " + message.channel.name)
    }
});

client.login(token);