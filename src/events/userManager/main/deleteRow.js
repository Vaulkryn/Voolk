import { google } from 'googleapis';

export function deleteRow(userData) {
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
            let userFound = false;

            for (const element of content) {
                if (element.table) {
                    const rows = element.table.tableRows;
                    const lastRowIndex = rows.length - 1;

                    for (let i = 1; i < rows.length; i++) {
                        const cells = rows[i].tableCells;
                        const discordPseudo = cells[0].content[0].paragraph.elements[0].textRun.content.trim();

                        if (discordPseudo === userData.displayName && i !== lastRowIndex) {
                            userFound = true;
                            
                            await docs.documents.batchUpdate({
                                documentId: documentId,
                                requestBody: {
                                    requests: [
                                        {
                                            deleteTableRow: {
                                                tableCellLocation: {
                                                    tableStartLocation: {
                                                        index: element.startIndex
                                                    },
                                                    rowIndex: i
                                                }
                                            }
                                        }
                                    ],
                                },
                            });
                            resolve();
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