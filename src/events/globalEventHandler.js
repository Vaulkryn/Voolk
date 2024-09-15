import { Events } from 'discord.js';
import { activeChannels } from './dynamicVoiceChannel.js';

export default function globalEventHandler(client) {
    client.on(Events.VoiceStateUpdate, async (oldState) => {
        for (const [channelId, creator] of activeChannels) {
            const channel = oldState.guild.channels.cache.get(channelId);
            if (channel && channel.members.size === 0) {
                try {
                    await channel.delete();
                    console.log(`Voice channel created by ${creator} deleted.\n`);
                    activeChannels.delete(channelId);
                } catch (error) {
                    console.error(`Error when deleting channel ${channelId}: ${error.message}`);
                }
            }
        }
    });
}