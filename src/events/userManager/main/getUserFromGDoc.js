import { google } from 'googleapis';

export async function getUserFromGDoc(displayName) {
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

    for (const element of content) {
        if (element.table) {
            const rows = element.table.tableRows;

            for (let i = 1; i < rows.length; i++) {
                const cells = rows[i].tableCells;

                const discordPseudo = cells[0].content[0]?.paragraph.elements[0]?.textRun.content.trim();
                if (discordPseudo && discordPseudo === displayName) {
                    return true;
                }
            }
        }
    }
    return false;
}