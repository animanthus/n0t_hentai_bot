const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'reply',
            group: 'prod',
            memberName: 'reply',
            description: 'Replies with a Message.',
            examples: ['reply']
        });
    }

    async run(msg) {
        const massage = await msg.say('owo');
        massage.edit('hewwwwwoooo?');
        const message = await msg.say('Hi, I\'m awake!');
        
        return message.edit('uwu');
    }
};