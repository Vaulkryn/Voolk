import { Client, GatewayIntentBits, Events } from 'discord.js';
import { getToken } from './utils/serverDataHandler.js';
import slashCommandHandler from './commands/slashCommandHandler.js';
import textCommandHandler from './commands/textCommandHandler.js';
import eventHandler from './events/eventHandler.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, () => {
    console.log('Voolk is ready.\n');
});

slashCommandHandler(client);
textCommandHandler(client);
eventHandler(client);

const TOKEN = getToken();
client.login(TOKEN);