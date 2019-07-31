const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'invite',
			group: 'prod',
			memberName: 'invite',
			description: 'Sends an invite link to the server',
		});
	}

	async run(msg) {
		const invite = await (this.client.generateInvite(['SEND_MESSAGES', 'MANAGE_GUILD', 'MENTION_EVERYONE', 'MANAGE_EMOJIS', 'ATTACH_FILES', 'EMBED_LINKS', 'VIEW_CHANNEL', 'ADD_REACTIONS']));
		return msg.say(`Link to invite bot to server! \n  ${invite}`);
	}
};