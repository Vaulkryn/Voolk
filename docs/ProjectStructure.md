## 📂 Structure du projet
```
Voolk
│
├── docs/
│   ├── BotConfig.md
│   ├── Features.md
│   ├── ProjectStructure.md
│   └── README.md
│
├── img/
│   ├── discord_profile.png
│   └── github_logo.png
│
├── src/
│   ├── commands/
│   │   ├── slash/
│   │   │   ├── listMember.js
│   │   │   └── play.js
│   │   │
│   │   ├── text/
│   │   │   ├── memberList.js
│   │   │   ├── rules.js
│   │   │   └── trolling.js
│   │   │
│   │   ├── slashCommandHandler.js
│   │   └── textCommandHandler.js
│   │
│   ├── config/
│   │   ├── commands.json
│   │   ├── google-credentials.json
│   │   └── rules.json
│   │
│   ├── events/
│   │   ├── userManager/
│   │   │   └── [...]
│   │   ├── dynamicVoiceChannel.js
│   │   ├── eventHandler.js
│   │   └── globalEventHandler.js
│   │
│   │
│   ├── utils/
│   │   └── serverDataHandler.js
│   │
│   ├── deploy-commands.js
│   └── index.js
│
├── .gitignore
├── LICENSE.txt
├── package.json
└── Procfile
```