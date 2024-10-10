import { google } from 'googleapis';
import { EmbedBuilder } from 'discord.js';

export async function updateEmbed(message) {
    try {
        const googleCredentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: googleCredentials.client_email,
                private_key: googleCredentials.private_key.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/documents'],
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

        const topUsers = users
            .sort((a, b) => b.gs - a.gs)
            .slice(0, 3);
        const totalUsers = users.length;
        const guild = message.guild;
        const members = await guild.members.fetch();
        const registeredPseudos = new Set(users.map(user => user.discordPseudo));
        const nonRegisteredUsers = members
            .filter(member => !member.user.bot && !registeredPseudos.has(member.displayName))
            .map(member => member.displayName);

        const totalNonRegistered = nonRegisteredUsers.length;
        const userData = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('⚔️ Membres actifs de la Guilde ⚔️')
            .setDescription(`---`)
            .addFields(
                {
                    name: 'Top 3 GearScore',
                    value: topUsers.length > 0
                        ? topUsers.map((user, index) => {
                            let medalEmoji;
                            if (index === 0) medalEmoji = '🥇';
                            else if (index === 1) medalEmoji = '🥈';
                            else if (index === 2) medalEmoji = '🥉';
                            return `${medalEmoji} ${user.discordPseudo}[${user.inGamePseudo}]\n${user.gs}\n`;
                        }).join('')
                        : 'Aucun joueur inscrit',
                    inline: false
                },
                {
                    name: ' ',
                    value: '---',
                    inline: false
                },
                {
                    name: 'Joueurs inscrits',
                    value: `✅ ${totalUsers}`,
                    inline: false
                },
                {
                    name: 'Joueurs non inscrits',
                    value: totalNonRegistered > 0 ? `🛑 ${totalNonRegistered}` : 'Aucun',
                    inline: false
                }
            );

        await message.edit({
            embeds: [userData],
        });

        console.log('Embed updated');
    } catch (error) {
        console.error('Error updating embed:', error);
    }
}