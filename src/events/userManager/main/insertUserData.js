import { google } from 'googleapis';

export function insertUserData(userData) {
    return new Promise(async (resolve, reject) => {
        try {
            const auth = new google.auth.GoogleAuth({
                keyFile: 'src/config/google-credentials.json',
                scopes: ['https://www.googleapis.com/auth/documents'],
            });

            const docs = google.docs({ version: 'v1', auth });
            const documentId = '1mpdSahAS6ifA1mGrZtF2V3-9gNi5bBdJ1XsMFhoJ20Q';

            const res = await docs.documents.get({
                documentId: documentId,
            });

            const content = res.data.body.content;
            const users = [];
            const updateRequests = [];

            for (const element of content) {
                if (element.table) {
                    const rows = element.table.tableRows;

                    for (let i = 1; i < rows.length; i++) {
                        const cells = rows[i].tableCells;
                        const user = {
                            discordPseudo: cells[0].content[0].paragraph.elements[0].textRun.content.trim(),
                            inGamePseudo: cells[1].content[0].paragraph.elements[0].textRun.content.trim(),
                            weapon: cells[2].content[0].paragraph.elements[0].textRun.content.trim(),
                            gs: cells[3].content[0].paragraph.elements[0].textRun.content.trim(),
                        };

                        if (!user.gs || user.gs === '') {
                            user.gs = userData.gs;
                            updateRequests.push({
                                insertText: {
                                    location: {
                                        index: cells[3].content[0].startIndex,
                                    },
                                    text: `${user.gs}`,
                                },
                            });
                        }

                        if (!user.weapon || user.weapon === '') {
                            user.weapon = userData.weapon;
                            updateRequests.push({
                                insertText: {
                                    location: {
                                        index: cells[2].content[0].startIndex,
                                    },
                                    text: `${user.weapon}`,
                                },
                            });
                        }

                        if (!user.inGamePseudo || user.inGamePseudo === '') {
                            user.inGamePseudo = userData.inGamePseudo;
                            updateRequests.push({
                                insertText: {
                                    location: {
                                        index: cells[1].content[0].startIndex,
                                    },
                                    text: `${user.inGamePseudo}`,
                                },
                            });
                        }

                        if (!user.discordPseudo || user.discordPseudo === '') {
                            user.discordPseudo = userData.displayName;
                            updateRequests.push({
                                insertText: {
                                    location: {
                                        index: cells[0].content[0].startIndex,
                                    },
                                    text: `${user.discordPseudo}`,
                                },
                            });
                        }
                        users.push(user);
                    }
                }
            }

            if (updateRequests.length > 0) {
                await docs.documents.batchUpdate({
                    documentId: documentId,
                    requestBody: { requests: updateRequests },
                });
                console.log(`User data updated: ${userData.displayName}[${userData.inGamePseudo}] | Weapon: ${userData.weapon} | GearScore: ${userData.gs}`);
            }

            resolve();

        } catch (error) {
            console.error('Error reading and updating table in Google Doc:', error);
            reject(error);
        }
    });
}