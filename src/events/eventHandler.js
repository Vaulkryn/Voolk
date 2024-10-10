import { Events } from 'discord.js';
import { dynamicVoiceChannel } from './dynamicVoiceChannel.js';
import { newUserForm } from './userManager/main/newUserForm.js';
import { newUserModal } from './userManager/main/newUserModal.js';
import { modifyUserForm } from './userManager/main/modifyUserForm.js';
import { modifyUserModal } from './userManager/main/modifyUserModal.js';
import { getUserFromGDoc } from './userManager/main/getUserFromGDoc.js';

export default function eventHandler(client) {
    client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
        dynamicVoiceChannel(oldState, newState);
    });

    client.on(Events.InteractionCreate, async (interaction) => {
        const member = interaction.member;
        const displayName = member.displayName;

        if (interaction.isButton() && interaction.customId === 'infoMember') {
            const userExists = await getUserFromGDoc(displayName);

            if (userExists) {
                await modifyUserForm(interaction, displayName);
            } else {
                await newUserForm(interaction, displayName);
            }
        } else if (interaction.isModalSubmit() && interaction.customId === 'newUserModal') {
            await newUserModal(interaction, displayName);
        } else if (interaction.isModalSubmit() && interaction.customId === 'modifyUserModal') {
            await modifyUserModal(interaction, displayName);
        }
    });
}