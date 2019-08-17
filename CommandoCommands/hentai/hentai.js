const { Command } = require('discord.js-commando');
const request = require('node-superfetch');


module.exports = class HentaiCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hentai',
			group: 'hentai',
			memberName: 'hentai',
			description: 'Searches for one hentai image',
			args:[
				{
					key:'author',
					prompt:'Do you want to troll a user?',
					type: 'user',
					default: msg => msg.author,
				},


			],

		});
	}
	async run(msg, { author }) {
        const odds = 4;
		const check = Math.floor((Math.random() * odds));
		if(check <= 1) {
			msg.say(`What a l0ser! ${author}   <- This person searched for hentai zzz`, { files:['./assets/mikuPout.jpg'] });
		}
		let link = '';
		switch(Math.floor((Math.random() * 3))) {
		case 0:
			link = await this.rhentai();
			break;
		case 1:
			link = await this.recchi();
			break;
		case 2:
			link = await this.danbooru();
			break;
		}

		return msg.say({ files:[link] });
	}
	async rhentai() {
		try{
			const { body } = await request.get('https://reddit.com/r/hentai.json');
			const randomNum = Math.floor((Math.random() * 24) + 2);
			const img = body.data.children[randomNum].data.url;
			return img;
		}
		catch{
			return './assets/mikuPout.jpg';
		}
	}
	async recchi() {
		try{
			const { body } = await request.get('https://reddit.com/r/ecchi.json');
			const randomNum = Math.floor((Math.random() * 24) + 2);
			const img = body.data.children[randomNum].data.url;
			return img;
		}
		catch{
			return './assets/mikuPout.jpg';
		}
	}
	async danbooru() {
		try{
			let index = 0 ;
			const maxAttempts = 10;
			for (index = 0; index < maxAttempts; index += 1) {
				const num = Math.floor((Math.random() * 3500000) + 20000);
	    	    const{ body } = await request.get(`https://danbooru.donmai.us/posts/${num}.json`);
		    	const img = body.file_url;
		    	if (typeof img !== undefined) {
			    	return img;
				}
			}
			return './assets/mikuPout.jpg';


		}
		catch{
			return './assets/mikuPout.jpg';
		}
	}
};