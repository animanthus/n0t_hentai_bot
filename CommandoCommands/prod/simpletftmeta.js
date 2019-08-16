const { Command } = require('discord.js-commando');
const request = require('axios');
const cheerio = require ('cheerio');

module.exports = class simpletftmetaCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'simpletftmeta',
			group: 'prod',
			memberName: 'simpletftmeta',
			description: 'Grabs the meta builds for tft this patch! In case you don\'t like the info overload of the other tft command.',
			aliases:['stft'],
		});
	}

	async run(msg) {
		const link = 'https://progameguides.com/teamfight-tactics/teamfight-tactics-tft-best-team-comps/';
		try {
			const response = await request.get(link);
			const listImgs = [];

			if (response.status === 200) {
				const html = response.data;
				const $ = cheerio.load(html);
				$('.entry-content').find('p').find('img').each((i, element)=>{
					listImgs[i] = element['attribs']['src'];


				});
			}


			return msg.say (`Here are the viable builds from this url: \n ${link}`, { files: listImgs });
			// return msg.say({ files:[body.data.children[3].data.url, body.data.children[4].data.url, body.data.children[5].data.url] });
		}
		catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};