import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export async function modifyUserForm(interaction, displayName) {
    const modal = new ModalBuilder()
        .setCustomId('modifyUserModal')
        .setTitle(`⚔️ Yo ${displayName}`);

    const input1 = new TextInputBuilder()
        .setCustomId('input1')
        .setLabel('Tu joues une autre classe ?')
        .setMaxLength(30)
        .setPlaceholder('Laisser vide si pas de changements')
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

        const input2 = new TextInputBuilder()
        .setCustomId('input2')
        .setLabel('T\'as up ton GearScore ?')
        .setMaxLength(4)
        .setPlaceholder('Putain le GS de fou')
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

    const actionRow1 = new ActionRowBuilder().addComponents(input1);
    const actionRow2 = new ActionRowBuilder().addComponents(input2);

    modal.addComponents(actionRow1, actionRow2);

    await interaction.showModal(modal);
}