import { Events } from 'discord.js';
import executeExempleCommand from './slash/executeExempleCommand.js';
/*import [FunctionName] from './[FunctionPath.js]';*/

export default function slashCommandHandler(client) {
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction;
        /*if (commandName === '[FunctionName]') {
            await [FunctionName](interaction);
        }*/
        if (commandName === 'slash') {
            await executeExempleCommand(interaction);
        }
    });
}