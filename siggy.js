// Load required libraries
const Discord = require("discord.js");
const fs = require("fs");

// Load required files
const { help, download, complete, error } = require("./embed.js");
const Youtube = require("./youtube.js");

// Load data to run bot
const { token,
	prefix
} = require("./config.json");

// Start up and log into Discord bot client
const client = new Discord.Client();
client.login(token);

// Function to play intro theme when user joins.
function join(member) {
    let VoiceChannel = member.channel;

    console.log("\t" + member.member.nickname + " joined " + VoiceChannel.name);
    var id = '';
    if (fs.existsSync("intro/" + member.id + ".mp3")) {
        id = member.id;
    } else {
        return;
        id = "default";
    }

    VoiceChannel.join()
    .then(connection => {
	const dispatcher = connection.play("intro/" + id + ".mp3");
        
	dispatcher.on('start', () => {
            connection.player.streamingData.pausedTime = 0;
        });

	dispatcher.on('finish', () => {
        connection.disconnect();
        /*
        setTimeout(function() {
            connection.disconnect();
        }, 1000);
        */
	});

	// Error handle
	connection.on('error', error => {
	    console.log("Websocket error has occurred");
	    
	});
    })
    .catch(console.error);
}

// Function to notify when user leaves.
function leave(member) {
    let VoiceChannel = member.channel;

    console.log("\t" + member.member.nickname + " left " + VoiceChannel.name);
}

// Displays to console when Siggy is ready to go
client.on("ready", () => {
    console.log("Music bot is ready!");
});

// Commands for when a message is sent
client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        // Returns if message starts with wrong prefix or is sent from a bot
        return;
    }

    let args = message.content.substring(prefix.length).split(" ");
    switch(args[0]) {
        case 'h': //Fall through
        case 'help':
            message.channel.send(help);
        break;

        case 'intro':
            // Checks to see if second argument is a YouTube link
            [parsedYTID, parsedTime]  = Youtube.urlParser(args[1]);
            if (!parsedYTID) {
                message.channel.send("You need to provide a YouTube link!");
                message.channel.send(help);
                return;
            }
            
            duration = Youtube.numValue(args[2]);
            volume = Youtube.numValue(args[3]);
            Youtube.mp3Cutter(parsedYTID, message.author.id, +parsedTime, +duration, +volume, message.channel);
        break;
    }
});

// Commands for when a person joins, leaves, or moves channels.
client.on('voiceStateUpdate', (oldMember, newMember) => {
    // Checks if user is a bot
    if (oldMember.member.user.bot || newMember.member.userbot) {
        return;
    }

    let newUserChannel = newMember.channel;
    let oldUserChannel = oldMember.channel;

    if (!oldUserChannel && newUserChannel) {
        // User joins a channel
        join(newMember);
    } else if (!newUserChannel) {
        // User leaves a channel
        leave(oldMember);     
    } else if (oldUserChannel && newUserChannel && oldUserChannel.id != newUserChannel.id) {
        // User switches channels
        join(newMember);
    }
});