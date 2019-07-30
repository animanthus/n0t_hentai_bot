const { Command } = require('discord.js-commando');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            group: 'prod',
            memberName: 'say',
            aliases: ['parrot', 'copycat', 'echo'],
            description: 'Replies with the text you provide.',
            examples: ['say Hi there!'],
            throttling:{
                usages:1,
                duration:300,

            },
            guildOnly:true,
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like the bot to say?',
                    type: 'string',
                    validate: text => {
                        
                        if (text.length < 50) return true;
                        return ('Message Content is over 50 characters');
                    }    
                }
            ]
        });    
    }

    run(msg, { text }) {
        msg.delete();
        return msg.say(text);
    }
};