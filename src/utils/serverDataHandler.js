import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.BRANCH_ENV || 'dev-branch';

let configPath;

if (env === 'main') {
    configPath = path.resolve('./src/config/prod-config/serverData.json');
    console.log('Chemin du fichier de config:', configPath);
} else if (env === 'dev-branch') {
    configPath = path.resolve('./src/config/dev-config/serverData.json');
    console.log('Chemin du fichier de config:', configPath);
} else {
    throw new Error('Environnement non reconnu !');
}

let config;

function loadConfig() {
    try {
        config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } catch (error) {
        console.error(error);
        config = {};
    }
}

loadConfig();

export function getToken() {
    return config.token;
}

export function getClientId() {
    return config.client_id;
}

export function getAllGuildIds() {
    return Object.values(config.servers).map(server => server.guild_id);
}

export function getServerConfigByGuildId(guildId) {
    for (const serverName in config.servers) {
        if (config.servers[serverName].guild_id === guildId) {
            return { serverName, ...config.servers[serverName] };
        }
    }
}

export function reloadConfig() {
    loadConfig();
}