# 🔐 Permissions

## Paramètres nécessaires dans le **[Discord Developer Portal](https://discord.com/developers/applications)**
__Settings__ ➡️ __Bot__ ➡️ __Privileged Gateway Intents:__
- Presence Intent
- Server Members Intent
- Message Content Intent

---

__Settings__ ➡️ __OAuth2__ ➡️ __OAuth2 URL Generator__ ➡️ __Scopes:__ ➡️ __Bot:__

### General permissions
- Manage Server
- Manage Roles
- Manage Channels
- Create Instant Invite
- View Channels
- Manage Events
- Create Events
- Moderate Members

### Text permissions
- Send Messages
- Create Public Threads
- Create Private Threads
- Send Messages in Threads
- Manage Messages
- Manage Threads
- Embed Links
- Add Reactions
- Use Slash Commands
- Create Polls

### Voice permissions
- Connect
- Speak
- Mute Members
- Deafen Members
- Move Members

# 📦 Dépendances

- ### __[discord.js](https://github.com/discordjs)__
- ### __[discordjs/voice](https://github.com/discordjs/voice?tab=readme-ov-file)__
- ### __[distube/ytdl-core](https://github.com/distubejs/ytdl-core)__
- ### __[FFmpeg-static](https://github.com/eugeneware/ffmpeg-static)__
- ### __[fluent-ffmpeg](https://github.com/fluent-ffmpeg)__
- ### __[sodium-native](https://github.com/sodium-friends/sodium-native)__

`npm install @discordjs/voice @distube/ytdl-core discord.js ffmpeg-static fluent-ffmpeg sodium-native`