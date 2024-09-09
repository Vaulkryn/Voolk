import { getServerConfigByGuildId } from '../../src/utils/serverDataHandler.js';

const activeChannels = new Map();

export async function dynamicVoiceChannel(oldState, newState) {
    const guildId = newState.guild.id;
    const serverConfig = getServerConfigByGuildId(guildId);

    if (!serverConfig || !serverConfig.dynamic_voice_channel) {
        console.error("Invalid server configuration or dynamic_voice_channel not defined.");
        return;
    }

    const dynamicVoiceChannels = Array.isArray(serverConfig.dynamic_voice_channel)
        ? serverConfig.dynamic_voice_channel
        : [serverConfig.dynamic_voice_channel];

    if (dynamicVoiceChannels.includes(newState.channelId) && !dynamicVoiceChannels.includes(oldState.channelId)) {
        try {
            const newChannel = await newState.guild.channels.create({
                name: `🔊 Salon de ${newState.member.user.username}`,
                type: 2,
                parent: newState.channel ? newState.channel.parentId : null,
            });

            await newState.setChannel(newChannel);

            activeChannels.set(newChannel.id, newState.member.user.username);

            console.log(`New voice channel: ${newChannel.name} (${newChannel.id})`);

            newState.guild.client.on('voiceStateUpdate', async (updatedVoiceState) => {
                if (activeChannels.has(newChannel.id) && newChannel.members.size === 0) {
                    try {
                        const cachedChannel = updatedVoiceState.guild.channels.cache.get(newChannel.id);
                        if (cachedChannel) {
                            await cachedChannel.delete();
                            const creatorName = activeChannels.get(newChannel.id);
                            console.log(`The channel created by ${creatorName} (${newChannel.id}) has been deleted.\n`);
                            activeChannels.delete(newChannel.id);
                        } else {
                            console.log(`${newChannel.id} no longer exists.`);
                        }
                    } catch (error) {
                        console.error(`Error when deleting: ${error.message}`);
                    }
                }
            });
        } catch (error) {
            console.error(`Error creating or managing the new voice channel: ${error.message}`);
        }
    }
}