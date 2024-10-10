import { google } from 'googleapis';

export function editUserData(userData) {
    return new Promise(async (resolve, reject) => {
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
            let userInfo = null;
            let userFound = false;

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

                        if (user.discordPseudo === userData.displayName) {
                            userFound = true;
                            userInfo = user;

                            const data = {
                                displayName: user.discordPseudo,
                                inGamePseudo: user.inGamePseudo,
                                weapon: userData.weapon !== null ? userData.weapon : user.weapon,
                                gs: userData.gs !== null ? userData.gs : user.gs,
                            };
                            resolve(data);
                            return;
                        }
                    }
                    if (userFound) {
                        break;
                    }
                }
            }
            if (!userFound) {
                console.log('No users found with the provided Discord username.');
                resolve(null);
            }

        } catch (error) {
            console.error('Error reading table in Google Doc:', error);
            reject(error);
        }
    });
}