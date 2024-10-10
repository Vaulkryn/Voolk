import { processNewUser } from './processNewUser.js';

export async function newUserModal(interaction, displayName) {
    const inGamePseudo = interaction.fields.getTextInputValue('input1');
    const weapon = interaction.fields.getTextInputValue('input2');
    const gs = interaction.fields.getTextInputValue('input3');

    const data = { displayName, inGamePseudo, weapon, gs };

    await interaction.deferReply({ ephemeral: true });

    try {
        await processNewUser(data, interaction.message);
        await interaction.editReply({
            content: 'Inscription confirmée ✅',
        });
    } catch (error) {
        console.error(error);
        await interaction.editReply({
            content: 'Une erreur est survenue lors de l\'ajout des informations au G.Doc.',
        });
    }
}