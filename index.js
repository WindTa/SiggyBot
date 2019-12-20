// Load required libraries
const Discord = require("discord.js");
const mysql = require("mysql");
const ytdl = require("ytdl-core");

// Load data to run bot and database
const { token, 
        prefix, 
        host, 
        user, 
        password, 
        database
} = require("./config.json");

// Start up discord client
const client = new Discord.Client();

// Connect to database
var con = mysql.createConnection({host, user, password, database});
con.connect(err => {
    if (err) console.error(err);
    console.log("Connected to database!");
})

// Log into client
client.login(token);

// Function to pull ID of a YouTube video
function youtubeParser(url){
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

client.on("ready", () => {
    console.log("Music bot is ready!");
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        // Returns if message starts with wrong prefix or is sent from a bot
        return;
    }

    let args = message.content.substring(prefix.length).split(" ");
    switch(args[0]) {
        case 'help':
            message.channel.send("Sending help message");
        break;

        case 'intro':
            // Checks to see if second argument is a YouTube link
            [parsedYTID, parsedTime]  = youtubeParser(args[1]);
            if (!parsedYTID) {
                message.channel.send("You need to provide a YouTube link!");
                return;
            }
            
            // Update database
            con.query(`SELECT * FROM intro where id = '${message.author.id}'`, (err, rows) => {
                if (err) console.error(err);
                
                let sql; 
                if (rows.length < 1) {
                    sql = `INSERT INTO intro (id, yt, start, duration) VALUES('${message.author.id}', '${parsedYTID}', ${parsedTime}, ${durationValue(args[2])})`;
                } else {
                    let yt = rows[0].yt;
                    sql = `UPDATE intro SET 
                        yt = '${parsedYTID}', 
                        start = ${parsedTime}, 
                        duration = ${durationValue(args[2])} 
                        WHERE id = '${message.author.id}'`;
                }
                con.query(sql, console.log);
            });
            // Display user's intro
        break;
    }
});