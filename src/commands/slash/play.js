import { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } from '@discordjs/voice';
import { EmbedBuilder, PermissionsBitField } from 'discord.js';
import { PassThrough } from 'stream';
import ytdl from '@distube/ytdl-core';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic);

export default async function play(interaction) {
    const url = interaction.options.getString('url');
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
        return interaction.reply({
            content: '⚠️ Vous devez être dans un salon vocal pour lire l\'audio.',
            ephemeral: true
        });
    }

    const permissions = voiceChannel.permissionsFor(interaction.guild.members.me);

    const requiredPermissions = [
        PermissionsBitField.Flags.Connect,
        PermissionsBitField.Flags.Speak
    ];

    const missingPermissions = requiredPermissions.filter(permission => !permissions.has(permission));

    if (missingPermissions.length > 0) {
        const missingPermsText = missingPermissions.map(perm => {
            if (perm === PermissionsBitField.Flags.Connect) return 'Connecter';
            if (perm === PermissionsBitField.Flags.Speak) return 'Parler';
            return perm;
        }).join(', ');

        return interaction.reply({
            content: `⚠️ Permissions manquantes: ${missingPermsText}`,
            ephemeral: true
        });
    }

    const youtubeUrlPattern = /^https:\/\/(www\.)?youtube\.com\/|^https:\/\/m\.youtube\.com\/|^https:\/\/youtu\.be\//i;
    if (!youtubeUrlPattern.test(url)) {
        return interaction.reply({
            content: '⚠️ URL invalide, seuls les URLs YouTube sont supportés.',
            ephemeral: true
        });
    }

    await interaction.deferReply({ ephemeral: true });
    try {
        const videoInfo = await ytdl.getInfo(url);
        const title = videoInfo.videoDetails.title;
        const author = videoInfo.videoDetails.author.name;

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        connection.on(VoiceConnectionStatus.Ready, () => {
            console.log(`Voolk is connected to: ${voiceChannel.name}\n`);
        });

        const passThroughStream = new PassThrough();
        const stream = ytdl(url, {
            filter: 'audioonly',
            requestOptions: {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
                }
            }
        });

        stream.on('error', async (err) => {
            console.error('Stream error:', err);
            await interaction.followUp({
                content: '⚠️ Erreur détecté. Rechargement en cours 🔄',
                ephemeral: true
            });
            setTimeout(() => playStream(), 5000);
        });

        ffmpeg(stream)
            .audioCodec('libopus')
            .format('opus')
            .on('error', async err => {
                console.error('FFmpeg error:\n', err);
                await interaction.followUp({
                    content: '⚠️ Une erreur s\'est produite avec FFmpeg. Nouvelle tentative 🔄',
                    ephemeral: true
                });
                setTimeout(() => playStream(), 5000);
            })
            .pipe(passThroughStream);

        const player = createAudioPlayer();
        const resource = createAudioResource(passThroughStream);

        player.play(resource);
        connection.subscribe(player);

        const embed = new EmbedBuilder()
            .setColor('#0089CE')
            .setTitle(`🔊 ${title}`);

        await interaction.editReply({
            embeds: [embed]
        });

        console.log(`Audio YouTube:\nTitre: ${title}\nChaîne YT: ${author}`);
    } catch (error) {
        console.error('Error retrieving video information or playing:\n', error);
        await interaction.editReply({
            content: 'Erreur lors de la lecture de la vidéo.'
        });
    }
}