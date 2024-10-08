import { Events } from 'discord.js';
import play from './slash/play.js';
import listMember from './slash/listMember.js';

export default function slashCommandHandler(client) {
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;
        if (commandName === 'play') {
            await play(interaction);
        }
        if (commandName === 'listmember') {
            await listMember(interaction);
        }
    });
}