import { insertRow } from './insertRow.js';
import { deleteRow } from './deleteRow.js';
import { editUserData } from './editUserData.js';
import { insertUserData } from './insertUserData.js';
import { updateEmbed } from '../updateEmbed.js';

export async function processEditUser(data, message) {
    try {
        await insertRow();
        const userData = await editUserData(data);
        await insertUserData(userData);
        await deleteRow(userData)
        await updateEmbed(message);
        console.log("Process completed.\n");
    } catch (error) {
        console.error("Error while executing functions:", error);
    }
}