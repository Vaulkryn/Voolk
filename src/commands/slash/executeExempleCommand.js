export default async function executeExempleCommand(interaction) {
    try {
        const subCommand = interaction.options.getSubcommand(false);
        const stringOption = interaction.options.getString('STRING', false);
        const integerOption = interaction.options.getInteger('INTEGER', false);

        if (subCommand) {
            await interaction.reply(`Vous avez utilisé la sous-commande : ${subCommand}`);
        } else if (stringOption) {
            await interaction.reply(`Vous avez fourni la chaîne : ${stringOption}`);
        } else if (integerOption !== null) {
            await interaction.reply(`Vous avez fourni l'entier : ${integerOption}`);
        } else {
            await interaction.reply('Aucune option valide n’a été fournie.');
        }
    } catch (error) {
        console.error('Erreur lors de l’exécution de la commande :', error);
        await interaction.reply({
            content: 'Une erreur est survenue lors de l’exécution de la commande.',
            ephemeral: true,
        });
    }
}
