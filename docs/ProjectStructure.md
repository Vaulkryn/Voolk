## 📂 Structure du projet

📂 **Voolk/**
    
- 📂 **docs/**
    - `BotConfig.md`
    - `Features.md`
    - `ProjectStructure.md`
    - `README.md`
    
- 📂 **img/**
    - `discord_profile.png`
    - `github_logo.png`
    
- 📂 **src/**
    - 📂 **commands/**
        - 📂 **slash/**
            - `executeExempleCommand.js`
        - 📂 **text/**
            - `rule.js`
        - `slashCommandHandler.js`
        - `textCommandHandler.js`
    - 📂 **config/**
        - `commands.json`
        - `rules.json`
    - 📂 **events/**
        - `dynamicVoiceChannel.js`
        - `eventHandler.js`
        - `globalEventHandler.js`
    - 📂 **utils/**
        - `serverDataHandler.js`
    - `deploy-commands.js`
    - `index.js`
    
- `.gitignore`
- `LICENSE.txt`
- `package.json`
- `Procfile`