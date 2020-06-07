const malScraper = require('mal-scraper');
const search = malScraper.search;
const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');


module.exports = class malsearchCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'malsearch',
			group: 'prod',
			memberName: 'malsearch',
			aliases: ['ml', 'anime'],
			description: 'Searches anime from myanimelist',
			examples: ['say Hi there!'],
			args: [
				{
					key: 'text',
					prompt: 'What anime do you want to search?',
					type: 'string',
				},
			],
		});
	}

	async run(msg, { text }) {
		const info = await malScraper.getInfoFromName(text);
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
	}
};
