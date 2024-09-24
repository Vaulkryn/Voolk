import dotenv from 'dotenv';

dotenv.config();

export function getToken() {
    return process.env.TOKEN;
}

export function getClientId() {
    return process.env.CLIENT_ID;
}

export function getAllGuildIds() {
    const guildIds = [];
    if (process.env.LEVIATHAN_GUILD_ID) {
        guildIds.push(process.env.LEVIATHAN_GUILD_ID);
    }
    // Others servers
    return guildIds;
}

export function getServerConfigByGuildId(guildId) {
    if (guildId === process.env.LEVIATHAN_GUILD_ID) {
        return {
            serverName: "Léviathan",
            guild_id: process.env.LEVIATHAN_GUILD_ID,
            dynamic_voice_channel: process.env.LEVIATHAN_DYNAMIC_VOICE_CHANNELS.split(','),
            commands: JSON.parse(process.env.LEVIATHAN_COMMANDS)
        };
    }
    // Others servers
    return null;
}