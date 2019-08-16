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
			aliases: ['tft'],
		});
	}

	async run(msg) {
		const link = 'https://progameguides.com/teamfight-tactics/teamfight-tactics-tft-best-team-comps/';
		const linkTwo = 'https://mobalytics.gg/blog/best-tft-comps/';

		msg.say(`Here are the viable builds from these urls: \n ${linkTwo} \n ${link}`);

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

			const respTwo = await request.get(linkTwo);

			const imgList = [];
			if(respTwo.status === 200) {
				const html = respTwo.data;
				const $ = cheerio.load(html);
				$('.post-body').find('p').find('img').each((i, element)=>{

					imgList[i] = element['attribs']['src'];

					if (imgList[i].includes('banner')) {
						imgList.pop();
					}


				});

			}
			const pgg = listImgs.filter(Boolean);
			const temp = imgList.filter(Boolean);
			const mobalytics = this.chunkArray(temp, 9);
			mobalytics.forEach(element =>{
				msg.say({ files: element });
			});
			return msg.say ({ files: pgg });
			// return msg.say({ files:[body.data.children[3].data.url, body.data.children[4].data.url, body.data.children[5].data.url] });
		}
		catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
	chunkArray(myArray, chunk_size) {
		let index = 0;
		const arrayLength = myArray.length;
		const tempArray = [];

		for (index = 0; index < arrayLength; index += chunk_size) {
			const myChunk = myArray.slice(index, index + chunk_size);
			tempArray.push(myChunk);
		}

		return tempArray;
	}
};