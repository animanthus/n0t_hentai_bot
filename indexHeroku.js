
const sqlite = require('sqlite');
const {CommandoClient, SQLiteProvider} = require('discord.js-commando');
const path = require('path');
const winston = require('winston');
// const {token } = require('./config.json');

const client = new CommandoClient({
    commandPrefix: '%',
    owner: '190984743460798466',
    disableEveryone: true,
    unknownCommandResponse: false
});

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console()
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});



client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['dev', 'functions in development'],
        ['prod', 'stuff that kinda works lol'],
        ['hentai', 'it\'s what you think it is'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'CommandoCommands'));


sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
        client.setProvider(new SQLiteProvider(db));
    });


client.on('ready', () => {
    logger.log('info', 'The bot is online!');
    logger.log ('info',`Logged in as ${client.user.tag}!`);
    //console.log(`Logged in as ${client.user.tag}!`);
    //console.log('Logged in as '+  client.user.tag);
    client.user.setActivity('git clone https://github.com/animanthus/n0t_hentai_bot');
    });

client.login(process.env.BOT_TOKEN);