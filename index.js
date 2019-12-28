// Load required libraries
const Discord = require("discord.js");
const exec = require("child_process").exec;
const fs = require("fs");

// Load data to run bot and database
const { token, 
        prefix, 
        host, 
        user, 
        password, 
        database
} = require("./config.json");

// Embedded Help Message
const helpEmbed = new Discord.RichEmbed()
    .setColor("#000000")
    .setTitle("Help Manual for SiggyBot")
    .setDescription("SiggyBot will play your signature song")
    .setThumbnail("https://scontent-lax3-2.xx.fbcdn.net/v/t1.15752-9/82016613_1518447688294795_5932471724183388160_n.png?_nc_cat=107&_nc_ohc=LRbLCYFiQ4kAQmJc2u5KUUeuHngn24i7B_ARkuZ1fY6QC84VmkQhFB60A&_nc_ht=scontent-lax3-2.xx&oh=a53ca8c67cc689a3508fc94015525047&oe=5EA226F4")
    .addBlankField()
    .addField("?help", "Show this message.")
    .addField("?intro YouTubeURL", "ie. ?intro https://youtu.be/wWTgNQN1r0s\nClips 0:00-0:05.")
    .addField("?intro YouTubeURL duration", "ie. ?intro https://youtu.be/wWTgNQN1r0s?t=6 10 \nClips 0:06-0:16.")
const downloadEmbed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .setTitle("Downloading...");
const completeEmbed = new Discord.RichEmbed()
    .setColor("#00FF00")
    .setTitle("Download Complete.");

// Start up discord client
const client = new Discord.Client();

// Set up connections for streaming YouTube
const streamOptions = { seek: 0, volume: 1 };
var queue = [];

// Log into client
client.login(token);

// Function to pull ID of a YouTube video
function youtubeParser(url){
    if (url === undefined) {
        return [false, null];
    }
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*)?(\?t=)?(\d*)/;
    var match = url.match(regExp);
    return [match&&match[1].length==11 ? match[1] : null, match&&match[3].length!=0 ? match[3] : null];
}

// Function to check if argument is an Int object
function durationValue(duration) {
    if (duration === undefined) {
        return null;
    }
    var regExp = /(\d*)/;
    var match = duration.match(regExp);
    return match&&match[0].length!=0 ? match[0] : null;
}

// Function to grab section of YouTube MP3, uses command line code
function mp3Cutter(ytid, id, startSeconds, durationSeconds, channel) {
    if (durationSeconds == 0) {
        durationSeconds = 5;
    }
    
    startFormat = new Date(startSeconds*1000).toISOString().substr(11, 8);
    endFormat = new Date((startSeconds + durationSeconds)*1000).toISOString().substr(11, 8);

    channel.send(downloadEmbed).then((msg) => {
        const child1 = exec("youtube-dl -g -- " + ytid, function(err, result) {
            if (err) return console.log(err);
            var url = result.split("\n")[1];
            const child2 = exec("ffmpeg -i " + '"'+url+'"' + " -ss " + startFormat + " -to " + endFormat + " intro/" + id + ".mp3", function(err, result) {
                if (err) return console.log(err);
                msg.edit(completeEmbed);
            });
    
            child2.stdin.write("Y");
            child2.stdin.end();
        });
    })
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
            message.channel.send(helpEmbed);
        break;

        case 'intro':
            // Checks to see if second argument is a YouTube link
            [parsedYTID, parsedTime]  = youtubeParser(args[1]);
            
            if (!parsedYTID) {
                message.channel.send("You need to provide a YouTube link!");
                message.channel.send(helpEmbed);
                return;
            }
            
            duration = durationValue(args[2]);
            mp3Cutter(parsedYTID, message.author.id, +parsedTime, +duration, message.channel);
        break;
    }
});

// Commands for when a person joins, leaves, or moves channels.
client.on('voiceStateUpdate', (oldMember, newMember) => {
    if (oldMember.user.bot || newMember.user.bot) {
        return;
    }

    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    if (oldUserChannel === undefined && newUserChannel !== undefined) {
        // User joins a channel
        console.log("\t" + newMember.user.username + " joined " + newUserChannel.name);
        play(newMember, "intro");
    } else if (newUserChannel === undefined) {
        // User leaves a channel
        console.log("\t" + oldMember.user.username + " left " + oldUserChannel.name);
        //play(newMember, "outro");
    } else if (oldUserChannel && newUserChannel && oldUserChannel.id != newUserChannel.id) {
        // User moved channels
        console.log("\t" + newMember.user.username + " moved from " + oldUserChannel.name + " to " + newUserChannel.name);
        play(newMember, "intro");
    }
});

function play(newMember, table) {
    let VoiceChannel = newMember.guild.channels.find(channel => channel.id === newMember.voiceChannel.id);
    if (VoiceChannel != null) {
        console.log("\t\t" + VoiceChannel.name + " was found and is a " + VoiceChannel.type + " channel.");
        VoiceChannel.join()
        .then(connection => {
            console.log("\t\tBot joined the channel.");
            var id = '';
            if (fs.existsSync("intro/" + newMember.id + ".mp3")) {
                id = newMember.id;
            } else {
                id = "default";
            }
            const dispatcher = connection.playFile("intro/" + id + ".mp3");
            dispatcher.on('start', () => {
                connection.player.streamingData.pausedTime = 0;
            });
            //const dispatcher = connection.playFile("intro/" + newMember.id + ".mp3");
            //const dispatcher = connection.playFile("intro/" + newMember.id + ".mp3");
        })
        .catch(console.error)
    }
}