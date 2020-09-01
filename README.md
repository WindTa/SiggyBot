# SiggyBot

Allow Siggy bot to link Discord ID's to YouTube links and play whenever they join a voice channel.

## Steps to run. 

**NOTE: Currently only runs when WindTa is online. Currently working on hosting somewhere other my computer.** 

1. Click the following link:
   <https://discordapi.com/permissions.html#3165184>
2. Under **OAuth URL Generator** for the field **Client ID**, copy and paste `657028082468782101`.
3. Click the link at the bottom of the web page.
4. Sign into the redirected discord link, then select the server you wish to add it to.
   If you do not see your server, your account does not have server permissions to add the bot.
5. Type in `?h` or `?help` into any of your Discord Server's text channels for list of commands.

___

**If you wish to create your own bot and make changes, read below.**

___

## 1. What you need

### Node.js

<https://nodejs.org/en/download/>

1. Type `node -v` in **CMD Prompt** to confirm installation

### youtube-dl and ffmpeg for raspberry pi

1. To download youtube-dl: `sudo wget https://yt-dl.org/downloads/latest/youtube-dl -O /usr/local/bin/youtube-dl`
2. To set permission:  `sudo chmod a+rx /usr/local/bin/youtube-dl`
3. To download ffmpeg: `apt-get install ffmpeg`

### FFMPEG for windows

<https://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-20191217-bd83191-win64-static.zip>

1. After downloading, extract contents to a location, ie. **C:/FFMPEG**
2. Click on **Windows Start Menu** and type **Environment Variables**.
3. Click on **Edit environment variables on your account**
4. Click **Environment Variables...**
5. Under **System variables**, Click the variable **Path** and then click **Edit...**
6. Click **New**, then **Browse...** and select FFMPEG's bin folder, ie. **C:/FFMPEG/bin**
7. Type **ffmpeg -version** in **CMD Prompt** to confirm installation

___

## 2. Downloading the git

### Method 1: git clone

<https://git-scm.com/downloads>

1. Type `git --version` in **CMD Prompt** to confirm installation.
2. Locate folder to place project in
3. Type `cd <destination>` in **CMD Prompt** to change directories
4. Type `git clone https://github.com/WindTa/SiggyBot.git` to download project into directory

### Method 2: Download zip

1. Click **Clone or download** and then click **Download ZIP**
2. Locate and create folder to place project in
3. Extract contents to folder

___

## 3. Packages to install

### Windows-Build-Tools

- Needs to be installed first before installing node-opus, Run through Admin cmd

1. Type `npm install --global windows-build-tools` into **CMD Prompt**

### Discord.js and node-opus

#### Automatic

- This will automatically download the required packages listed under 

1. Type `npm install` into **CMD Prompt**

#### Manual

- Downloads each package individually

1. `npm install --save discord.js`
2. `npm install --save node-opus`

___

## 4. Steps to run your own instance

1. Click the following link:
   <https://discordapp.com/developers/applications>
2. Click **New Application** and give your bot a name. Copy the **Client ID**
3. Click **Bot** and then click **Add Bot** to make bot live
4. Click the following link to set permissions:
   <https://discordapi.com/permissions.html#0>
   You can also use the following link to use permissions already set for SiggyBot.
   <https://discordapi.com/permissions.html#3165184>
5. Check all required permissions. Paste **Client ID** into the **Client ID** field.
6. Click the link at the bottom of the web page.
7. Sign into the redirected discord link, then select the server you wish to add it to.
   If you do not see your server, your account does not have server permissions to add the bot

___

## 5. Steps to run bot

1. In the same directory that index.js is located in, create a new file called **config.json**
   This may be renamed but you will have to also change the file name in index.js
2. Type the following into **config.json**. The token string can be revealed from your bot application at. The prefix is up to your discretion.
   <https://discordapp.com/developers/applications>

    ```json
    {
        "token": "tokenstring",
        "prefix": "prefixstring"
    }
    ```

3. Save your changes.
4. Run index.js by typing **node index.js** in **CMD prompt**
5. The bot should now be running.
