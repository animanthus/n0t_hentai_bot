const { Command } = require('discord.js-commando');
const request = require('node-superfetch');


module.exports = class rHentaiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'rhentai',
			group: 'dev',
			memberName: 'rhentai',
			description: 'Hentai Image Fetcher. Sends random images from frontpage of r/hentai !! Fails when the images are too large :/',
			args: [
				{
					key: 'number',
					prompt: 'How many images do you want? Max 5!',
					type: 'string',
					default: '1',

				},
			],
		});
	}

	async run(msg, { number }) {
		try {
			const { body } = await request.get('https://reddit.com/r/hentai.json');
			let count = parseInt(number);
			if(Number.isNaN(count)) {
				count = 1;
			}
			if (count > 5) {
				return msg.say('The function can only retrieve a maximum of 5 images!');

			}
			const imgset = [];

			for (let c = 0; c < count; c++) {
				const randomNum = Math.floor((Math.random() * 24) + 2);
				console.log(randomNum);
				imgset[c] = body.data.children[randomNum].data.url;
				console.log(imgset[c]);
				if(imgset[c].includes('gfycat')) {
					const link = imgset[c];
					if(c === 0) {
						return msg.say(`${link}`);
					}
					imgset.pop();
					return msg.say(`${link}`, { files: imgset });
				}

			}


			return msg.say({ files: imgset });
		}
		catch (err) {
			return msg.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};