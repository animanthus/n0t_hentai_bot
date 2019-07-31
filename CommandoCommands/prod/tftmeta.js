const { Command } = require('discord.js-commando');
const request = require('axios');
const cheerio = require ('cheerio');

module.exports = class tftmetaCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'tftmeta',
			group: 'prod',
			memberName: 'tftmeta',
			description: 'Grabs the meta builds for tft this patch!',
		});
	}

	async run(msg) {
		try {
			const response = await request.get('https://progameguides.com/teamfight-tactics/teamfight-tactics-tft-best-team-comps/');
			const listImgs = [];
			if (response.status === 200) {
				const html = response.data;
				const $ = cheerio.load(html);
				$('.entry-content').find('p').find('img').each((i, element)=>{
					listImgs[i] = element['attribs']['src'];
				});
			}

			return msg.say ('Here are the meta builds:', { files: listImgs });
			// return msg.say({ files:[body.data.children[3].data.url, body.data.children[4].data.url, body.data.children[5].data.url] });
		}
		catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};