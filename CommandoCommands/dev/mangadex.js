const Mangadex = require('mangadex-api');

const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');


module.exports = class mangadexCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mangadex',
			group: 'dev',
			memberName: 'mangadex',
			aliases:['manga'],
			description: 'Searches manga from mangadex',
			examples: ['%manga attack on titan'],
			args: [
				{
					key: 'text',
					prompt: 'What manga do you want to search?',
					type: 'string',
				},
			],
		});
	}

	async run(msg, { text }) {
		const info = await Mangadex.search(text);
		const info2 = await Mangadex.search('senko');
		Mangadex.search('senko').then(response => {
			console.log(`Found ${response.titles.length} titles.`);
		  })
		console.log(info.titles);
		console.log(info2.titles);
		return msg.say('done');
		/*
		const content = [];
		content[0] = info.title;
		content[1] = info.url;
		content[2] = info.synopsis;
		const dots = '...';
		if(info.synopsis.length > 200) {
			content[2] = info.synopsis.substring(0, 200);
			content[2] = content[2].concat(dots);
		}
		const picture = info.picture;
		const embed = new RichEmbed()
			.setDescription(content[2])
			.setTitle(content[0])
			.setColor(0x00AE86)
			.setURL(content[1])
			.setImage(picture);
		return msg.embed(embed);
		*/
	}
};
