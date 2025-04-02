import { EmbedBuilder } from 'discord.js';
import fs from 'fs/promises';

export default async function rules(message) {
    try {
        const rulesData = await fs.readFile('./src/config/rules.json', 'utf8');
        const rules = JSON.parse(rulesData);
        const reglementEmbed = new EmbedBuilder()
            .setColor(rules.embedConfig.color)
            .setTitle(rules.embedConfig.title);

        Object.keys(rules).forEach(key => {
            if (key.startsWith('field')) {
                const field = rules[key];
                reglementEmbed.addFields({
                    name: field.title,
                    value: field.content.join('\n'),
                    inline: false
                });
            }
        });

        await message.channel.send({
            embeds: [reglementEmbed],
        });
        await message.delete();
    } catch (error) {
        console.error('Error sending embed:', error);
    }
}