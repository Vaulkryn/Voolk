import { processEditUser } from './processEditUser.js';

export async function modifyUserModal(interaction, displayName) {
    const weapon = interaction.fields.getTextInputValue('input1').trim() || null;
    const gs = interaction.fields.getTextInputValue('input2').trim() || null;

    const data = { displayName, weapon, gs };

    await interaction.deferReply({ ephemeral: true });

    try {
        if (!weapon && !gs) {
            await interaction.editReply({
                content: 'Aucune modification.',
            });
            return;
        }
        await processEditUser(data, interaction.message);
        await interaction.editReply({
            content: 'Infos mises à jour.',
        });
    } catch (error) {
        console.error(error);
        await interaction.editReply({
            content: 'Une erreur est survenue lors de l\'ajout des informations au document Google.',
        });
    }
}