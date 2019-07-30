const { Command } = require('discord.js-commando');
const request = require('node-superfetch');
const winston = require('winston');

const logger = winston.createLogger({
	transports: [
		new winston.transports.Console()
	],
	format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

module.exports = class rHentaiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rhentai',
			group: 'dev',
			memberName: 'rhentai',
			description: 'Hentai Image Fetcher',
		});
	}

	async run(msg) {
		try {
			const { body } = await request.get('https://reddit.com/r/hentai.json');
			// console.log(body);
			// return msg.say({ files: [body.file] });
			console.log(body.data.children[3].data.url);
            // logger.log('info', `${body.data.children}`);
			return msg.say({ files:[body.data.children[3].data.url, body.data.children[4].data.url, body.data.children[5].data.url] });
		}
		catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};