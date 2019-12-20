# SiggyBot

Allow a Discord bot to link Discord ID's to YouTube links and play whenever they join a voice channel.

___

## Packages to install

### Discord.js

`npm install discord.js --save`

### ytdl and opusscript

`npm install --save ytdl-core opusscript`

### mysql

`npm install --save mysql`

___

## Using MySql

Reference: https://www.youtube.com/watch?v=E5TVwyiCuYA&list=LLzew89ukV1_bX5G_-D8-16A&index=3&t=0s

### Useful MySQL commands:

`SHOW DATABASES;`: to see all of your databases
`USE sbdb;`: to select a database
`CREATE TABLE <tableName> (columnName1, column2, ...);`: to create tables in your database
`SHOW TABLES`: view tables in database
`DESCRIBE <tableName>`: view details about a table

### Data types to use when creating columns

**`<columnName> <dataType> <nullType>`**: general column syntax
`<columnName> VARCHAR(<size>) NOT NULL`: creates column columnName that's a varchar of size that can't be empty when the row is created.
`<columnName> INT`: creates column columnName that's an int that can be empty when the row is created.
___
