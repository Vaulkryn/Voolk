import { google } from 'googleapis';

export function insertRow() {
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
            let tableStartIndex = -1;
            let rowCount = 0;

            for (const element of content) {
                if (element.table) {
                    tableStartIndex = element.startIndex;
                    rowCount = element.table.tableRows.length;
                    break;
                }
            }
            const newRowIndex = rowCount - 1;
            const requests = [
                {
                    insertTableRow: {
                        tableCellLocation: {
                            tableStartLocation: {
                                index: tableStartIndex,
                            },
                            rowIndex: newRowIndex,
                        },
                        insertBelow: true,
                    },
                }
            ];

            await docs.documents.batchUpdate({
                documentId: documentId,
                requestBody: {
                    requests: requests,
                },
            });

            resolve();

        } catch (error) {
            console.error('Erreur lors de l\'insertion dans Google Doc :', error);
            reject(error);
        }
    });
}