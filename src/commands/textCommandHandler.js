import { Events } from 'discord.js';
import { enableTrolling, disableTrolling, trolling } from './text/trolling.js';
import rules from './text/rules.js';
import memberList from './text/memberList.js';

export default function textCommandHandler(client) {
    client.on(Events.MessageCreate, async (message) => {
        if (message.author.bot) return;
        if (message.content.startsWith('|rules')) {
            await rules(message);
        }
        if (message.content.startsWith('|memberList')) {
            await memberList(message);
        }
        if (message.content.startsWith('Go troll')) {
            await enableTrolling(message);
        }
        if (message.content.startsWith('Voolk arrête de troll')) {
            await disableTrolling(message);
        }
        await trolling(message);
    });
}