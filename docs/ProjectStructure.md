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
│   │   │   └── play.js
│   │   ├── text/
│   │   │   └── rules.js
│   │   │
│   │   ├── slashCommandHandler.js
│   │   └── textCommandHandler.js
│   │
│   ├── config/
│   │   ├── rules(exemple).json
│   │   └── serverData(exemple).json
│   │
│   ├── events/
│   │   ├── dynamicVoiceChannel.js
│   │   ├── eventHandler.js
│   │   └── globalEventHandler.js
│   │
│   ├── utils/
│   │   └── serverDataHandler.js
│   │
│   ├── deploy-commands.js
│   └── index.js
│
├── .env
├── .gitignore
├── LICENSE.txt
└── package.json
```