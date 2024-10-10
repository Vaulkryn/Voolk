import { insertRow } from './insertRow.js';
import { insertUserData } from './insertUserData.js';
import { updateEmbed } from '../updateEmbed.js';

export async function processNewUser(data, message) {
    try {
        await insertRow();
        await insertUserData(data);
        await updateEmbed(message);
        console.log("Process completed.\n");
    } catch (error) {
        console.error("Error while executing functions:", error);
    }
}