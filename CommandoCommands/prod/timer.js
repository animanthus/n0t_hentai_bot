const { Command } = require('discord.js-commando');


module.exports = class TimerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'timer',
			group: 'prod',
			memberName: 'timer',
			description: 'Sets a timer for x seconds',
			args: [
				{
					key: 'number',
					prompt: 'How many seconds should we set the stopwatch for?',
					type: 'string',
					default: '30',

				},
			],
		});
    }
    
    run(msg, { number }) {
		let count = parseInt(number);
		if(Number.isNaN(count)) {
			count = 1;
		}
		if (count > 300) {
		    return msg.say('The timer can only be set for a max 5 minutes!');
            }
        setTimeout(function(){ 
            return msg.say("Times up!"); 
        }, count * 1000);
    }
}; 