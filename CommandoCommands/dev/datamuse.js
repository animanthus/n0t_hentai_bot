const { Command } = require('discord.js-commando');
const request = require('node-superfetch');


module.exports = class datamuseCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'meanslike',
			group: 'prod',
			memberName: 'meanslike',
			examples:['MeansLike a soft touch', 'MeansLike a loud noise'],
			description: 'synonyms well uhh kinda (still in dev on the backburner ahahhahahaha)',
			args: [

				{
					key: 'content',
					prompt: 'What phrase do you want your word to mean like?',
					type: 'string',
				},
			],
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