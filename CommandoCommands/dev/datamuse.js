const { Command } = require('discord.js-commando');
const request = require('node-superfetch');


module.exports = class OxfordCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'datamuse',
			group: 'dev',
			memberName: 'datamuse',
			description: 'Currently in development! Please don\'t use this!!!',
			throttling:{
				usages:1,
				duration:300,

			},
			guildOnly:true,
		});
	}

	async run(msg) {
		try {
			const { body } = await request.get('https://aws.random.cat/meow');
			// console.log(body);
			return msg.say({ files: [body.file] });
		}
		catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};