const { Command } = require('discord.js-commando');
const request = require('node-superfetch');


module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			group: 'prod',
			memberName: 'cat',
			description: 'Super Fetch tester',
			throttling:{
				usages:1,
				duration:300,

			},
			guildOnly:true
		});    
	}

	async run(msg) {
		try {
			const { body } = await request.get('https://aws.random.cat/meow');
			// console.log(body);
			return msg.say({ files: [body.file] });
		} catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};