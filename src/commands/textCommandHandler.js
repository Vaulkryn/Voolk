import { Events } from 'discord.js';
import { enableTrolling, disableTrolling, trolling } from './text/trolling.js';
import rules from './text/rules.js';

export default function textCommandHandler(client) {
    client.on(Events.MessageCreate, async (message) => {
        if (message.author.bot) return;
        if (message.content.startsWith('|rules')) {
            await rules(message);
        }
        if (message.content.startsWith('Go faire chier Mykh en fait')) {
            await enableTrolling(message);
        }
        if (message.content.startsWith('Voolk arrête de faire chier Mykh')) {
            await disableTrolling(message);
        }
        await trolling(message);
    });
}
