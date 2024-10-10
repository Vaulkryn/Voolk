import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export async function newUserForm(interaction, displayName) {
    const modal = new ModalBuilder()
        .setCustomId('newUserModal')
        .setTitle(`👋 Salut ${displayName} !`);

    const input1 = new TextInputBuilder()
        .setCustomId('input1')
        .setLabel('Pseudo In-Game')
        .setMaxLength(40)
        .setStyle(TextInputStyle.Short);

    const input2 = new TextInputBuilder()
        .setCustomId('input2')
        .setLabel('Armes')
        .setMaxLength(30)
        .setPlaceholder('SnS & Dagger,  Staff & Wand,..')
        .setStyle(TextInputStyle.Short);

    const input3 = new TextInputBuilder()
        .setCustomId('input3')
        .setLabel('GearScore')
        .setMaxLength(4)
        .setStyle(TextInputStyle.Short);

    const actionRow1 = new ActionRowBuilder().addComponents(input1);
    const actionRow2 = new ActionRowBuilder().addComponents(input2);
    const actionRow3 = new ActionRowBuilder().addComponents(input3);

    modal.addComponents(actionRow1, actionRow2, actionRow3);

    await interaction.showModal(modal);
}