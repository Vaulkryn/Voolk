import { google } from 'googleapis';

export default async function listMember(interaction) {
    try {
        await interaction.deferReply({ ephemeral: true });

        const auth = new google.auth.GoogleAuth({
            keyFile: 'src/config/google-credentials.json',
            scopes: ['https://www.googleapis.com/auth/documents.readonly'],
        });

        const docs = google.docs({ version: 'v1', auth });
        const documentId = '1mpdSahAS6ifA1mGrZtF2V3-9gNi5bBdJ1XsMFhoJ20Q';

        const res = await docs.documents.get({
            documentId: documentId,
        });

        const content = res.data.body.content;
        const users = [];

        for (const element of content) {
            if (element.table) {
                const rows = element.table.tableRows;

                for (let i = 1; i < rows.length; i++) {
                    const cells = rows[i].tableCells;
                    const user = {
                        discordPseudo: cells[0].content[0].paragraph.elements[0].textRun.content.trim(),
                        inGamePseudo: cells[1].content[0].paragraph.elements[0].textRun.content.trim(),
                        weapon: cells[2].content[0].paragraph.elements[0].textRun.content.trim(),
                        gs: Number(cells[3].content[0].paragraph.elements[0].textRun.content.trim()),
                    };
                    users.push(user);
                }
            }
        }

        const guild = interaction.guild;
        const members = await guild.members.fetch();

        const registeredPseudos = new Set(users.map(user => user.discordPseudo));

        const nonRegisteredUsers = members
            .filter(member => !member.user.bot && !registeredPseudos.has(member.displayName))
            .map(member => member.displayName);

        const registeredUsers = users.map(user => user.discordPseudo);
        const totalRegistered = registeredUsers.length;
        const totalNonRegistered = nonRegisteredUsers.length;

        await interaction.editReply({
            content: `**Recensements des joueurs**\n\n` +
                `**Membres actifs recensés: ${totalRegistered}**\n` +
                (registeredUsers.length > 0
                    ? registeredUsers.join('\n')
                    : 'Aucun membre inscrit.') +
                `\n\n**Membres inactifs et/ou encore non inscrit: ${totalNonRegistered}**\n` +
                (totalNonRegistered > 0
                    ? nonRegisteredUsers.join('\n')
                    : 'Aucun membre non inscrit.'),
        });

    } catch (error) {
        console.error('Error in listMember function:', error);
        await interaction.editReply({
            content: 'Une erreur s\'est produite lors de la récupération des données.',
        });
    }
}