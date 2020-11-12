// Load required libraries
const exec = require("child_process").exec;

// Load required files
const { help, download, complete, error } = require("./embed.js");

// Function to pull ID of a YouTube video
function urlParser(url){
    // Returns false if there is no URL
    if (url === undefined) {
        return [false, null];
    }

    // Returns two arguments: YouTube video ID, YouTube video timestamp (if provided)
    var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*)?(\?t=)?(\d*(\.\d+)?)/;
    var match = url.match(regExp);
    return [match&&match[1].length==11 ? match[1] : null, match&&match[3].length!=0 ? match[3] : null];
}

// Function to check if argument is an Int object
function numValue(numValue) {
    // Returns false if there is no argument
    if (numValue === undefined) {
        return null;
    }

    // Returns duration
    //var regExp = /(\d\.\d*)/;
    var regExp = /\d*(\.\d+)?/;
    var match = numValue.match(regExp);
    return match&&match[0].length!=0 ? match[0] : null;
}

// Function to grab section of YouTube MP3, uses command line code
function mp3Cutter(ytid, id, startSeconds, durationSeconds, volumeChange, channel) {
    if (durationSeconds == 0) {
        durationSeconds = 5;
    }
    if (volumeChange == 0) {
        volumeChange = 1;
    }

    startFormat = new Date(startSeconds*1000).toISOString().substr(15, 8);
    endFormat = new Date((startSeconds + durationSeconds)*1000).toISOString().substr(15, 8);

    channel.send(download).then((msg) => {
        const child1 = exec("youtube-dl -g -- " + ytid, function(err, result) {
            if (err) {
                msg.edit(error);
                return console.log(err);
            }
            var url = result.split("\n")[1];
            var command = 'ffmpeg -i "' +url+ '" -filter:a "loudnorm, volume=' +  volumeChange + '" -ss ' + startFormat + ' -to ' + endFormat + ' intro/' + id + '.mp3';
            console.log(command);
            const child2 = exec(command, function(err, result) {
                if (err) {
                    msg.edit(error);
                    return console.log(err);
                } 
                msg.edit(complete);
            });
    
            child2.stdin.write("Y");
            child2.stdin.end();
        });
    })
}

module.exports = { urlParser, numValue, mp3Cutter };