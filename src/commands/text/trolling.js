const targetUserId = '328623766605398017';

const taunts = [
    "T'as pris des cours de médiocrité ou ça vient naturellement ?",
    "Tu devrais vraiment demander un remboursement pour ton niveau !",
    "Je vois que la médiocrité a trouvé son champion aujourd'hui",
    "Je suis sûr que tu as un talent caché... juste pas pour ça",
    "C’est fascinant de voir quelqu'un exceller dans l'art de l'inefficacité",
    "Si l'ennui était un sport, tu serais médaillé d'or",
    "C'est admirable de ta part de faire du bénévolat pour être le pire",
    "Tu dois être un vrai chef-d'œuvre... d'incompétence",
    "Je pensais que la défaite était une option, mais tu en fais un art",
    "Continue comme ça, et tu gagneras le prix du pire message de l'année",
    "Tu devrais vraiment te spécialiser dans les discours sans intérêt",
    "Tu sais, même un tas de briques a plus de personnalité que toi",
    "Si la banalité était un superpouvoir, tu serais le plus fort des héros",
    "Je vois que tu as pris le chemin de la médiocrité, et tu l'as bien emprunté",
    "À ce niveau, tu fais passer l'ennui pour de l'art",
    "Bravo, tu as réussi à atteindre un nouveau sommet... de l'ennui",
    "C’est presque artistique, la façon dont tu rates tout ce que tu touches",
    "On dirait que tu es un expert en commentaires insipides",
    "Le niveau zéro n’a jamais été aussi bien représenté",
    "Il y a des talents cachés, et puis il y a toi",
    "Il est rare de croiser quelqu'un dont les mots sont aussi pauvres que les actes",
    "Si l'ineptie était une science, tu serais le professeur émérite",
    "On dit que le silence est d'or, mais je crois que tes paroles sont la preuve du contraire",
    "Ta capacité à passer à côté du sujet est presque artistique",
    "Si la banalité était un art, tu serais le Picasso de l'ennui",
    "Tes arguments ont la profondeur d'un pâté de sable",
    "Il est fascinant de voir quelqu'un atteindre des sommets d'inefficacité avec une telle aisance",
    "Tu dois être le champion du monde en gestion de l'ennui",
    "Il semble que ta verbeuse ineptie ait trouvé une nouvelle dimension",
    "L'art de la subtilité n'a jamais été aussi mal interprété",
    "La profondeur de ton analyse est comparable à celle d'un plateau de table",
    "Ta présence est une illustration parfaite de la vacuité intellectuelle",
    "Il est impressionnant de voir quelqu'un atteindre des sommets d'ineptie avec une telle régularité",
    "Ton talent pour le non-sens est véritablement inégalé",
    "C’est un exploit de parvenir à être aussi plat avec autant de mots",
    "Le vide de ton discours est si dense qu'il en devient palpable",
    "Je me demande si tu as pris des leçons pour exceller dans l'art de l'ineptie",
    "Le degré d'ennui que tu génères est presque une prouesse technique",
    "Si la platitude était une œuvre d'art, tu serais le maître incontesté",
    "Ta capacité à tourner en rond dans l’inefficacité est presque admirable"
];

const enableMessages = [
    "Ah bon ? il est là lui ?",
    "Alors lui, il est pas prêt",
    "Oh bordel de merde",
    "Attends qu'il parle lui"
];

const timeouts = new Map();
let messageCount = new Map();
let isTrollingEnabled = false;
let usedTaunts = [];

function getUnusedTaunt() {
    if (usedTaunts.length === taunts.length) {
        usedTaunts = [];
    }

    let unusedTaunts = taunts.filter(taunt => !usedTaunts.includes(taunt));
    const randomIndex = Math.floor(Math.random() * unusedTaunts.length);
    const selectedTaunt = unusedTaunts[randomIndex];

    usedTaunts.push(selectedTaunt);
    return selectedTaunt;
}

export async function enableTrolling(message) {
    isTrollingEnabled = true;
    const randomIndex = Math.floor(Math.random() * enableMessages.length);
    const randomMessage = enableMessages[randomIndex];
    await message.reply(randomMessage);
}

export async function disableTrolling(message) {
    isTrollingEnabled = false;
    await message.reply("Aah meerde il me reste tellement de punchlines en plus");
    messageCount.delete(targetUserId);
    timeouts.delete(targetUserId);
}

export async function trolling(message) {
    if (!isTrollingEnabled || message.author.id !== targetUserId) return;
    try {
        if (!messageCount.has(targetUserId)) {
            messageCount.set(targetUserId, 0);
        }
        const count = messageCount.get(targetUserId) + 1;
        messageCount.set(targetUserId, count);

        const taunt = getUnusedTaunt();
        await message.reply(taunt);

        let timeoutDuration;
        let replyMessage;

        if (count === 12) {
            timeoutDuration = 30 * 1000;
            replyMessage = "Bon ça suffit on en peut plus";
        } else if (count === 24) {
            timeoutDuration = 5 * 60 * 1000;
            replyMessage = "Ah ouais ? Tu persistes en plus ?";
        } else if (count === 36) {
            timeoutDuration = 15 * 60 * 1000;
            replyMessage = "Oh alors là ! crois moi tu vas prendre tarif";
        } else {
            return;
        }

        if (!timeouts.has(targetUserId)) {
            await message.member.timeout(timeoutDuration, 'AHAHAH La justice c\'est moi !');
            await message.reply(replyMessage);
            timeouts.set(targetUserId, count);
        }
    } catch (error) {
        console.error('Error during trolling operation:\n', error);
        await message.reply("Oops! Les problèmes.");
    }
}