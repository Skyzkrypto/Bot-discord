const { Client, GatewayIntentBits, EmbedBuilder, ApplicationCommandNumericOptionMinMaxValueMixin, SlashCommandBuilder, PermissionFlagsBits, SlashCommandAssertions } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
       
    ],
});

client.on("ready", () => {
    console.log(`${client.user.tag} est démarré`);

});

prefix = "%"

client.on('messageCreate', async (message) => {
    const userID = message.author.id;
    if (!message.author.bot) {
        console.log(`${message.author.username} avec l'ID ${userID} a envoyé un message : "${message.content}"`);
    }

    if (message.content.startsWith("quoi")) {
        console.log("Quoi détecté");
        message.channel.send("feur");
    }

    if (message.content.startsWith("%ping")) {
        console.log(`Commande %ping détectée, l'auteur est : ${message.author.username}`);
        message.channel.send("pong");
    }

    if (message.content.startsWith("%nom")) {
        console.log(`Commande %nom détectée, l'auteur est : ${message.author.username}`);
        message.channel.send(`${client.user.tag} est votre bot préféré.`);
    }

    if (message.content.startsWith("%id")) {
        console.log(`Commande %id détectée, l'auteur est : ${message.author.username}`)
        const mention = message.mentions.users.first(); 
        const targetUser = mention || message.author;

        if (mention){
            if (mention.id){
                message.channel.send(`L'id de ${mention} est ${mention.id}`)
            } else {
                message.channel.send(`${mention} n'a pas d'id`)
            }
        } else {
            message.channel.send(`Votre id est ${targetUser.id}`);
        }
            
    }

    if (message.content.startsWith("%avatar")) {
        console.log(`Commande %avatar détectée, l'auteur est : ${message.author.username}`)
        const mention = message.mentions.users.first(); 
        const targetUser = mention || message.author; 

        if (targetUser) {
            if (targetUser.avatar) {
                const avatarURL = targetUser.displayAvatarURL({ format: "png", dynamic: true, size: 1024 });
                console.log(`La photo de profil de ${targetUser.tag} est ${avatarURL}`)
                message.channel.send(`La photo de profil de ${targetUser.tag} est ${avatarURL}`)
            } else {
                console.log(`${targetUser.tag} n'a pas de photo de profil`)
                message.channel.send(`${targetUser.tag} n'a pas de photo de profil`)
            }
        } else {
            console.log("Utilisateur non trouvé");
            message.channel.send("Utilisateur non trouvé");
        }
    }
    const read = "%read"
    if (message.content.startsWith("%read")) {
        console.log(`Commande %read détectée, l'auteur est : ${message.author.username}`)
        const message_read = message.content.substring(read.length)
        message.channel.send(`message : ${message_read}`)
        message.delete()
    }
    if (message.content.startsWith("%profile")) {

            
        console.log(`Commande %profile détectée, l'auteur est ${message.author}`)
            
        const targetUser = message.mentions.users.first() || message.author;
        
        const embed_profile = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle (`Profil de ${targetUser.username}`)
            .setDescription(`Voici le profil de ${targetUser.tag}`)
            .addFields(
                { name: '\u200b', value: '\u200b' },
                {name : "Nom d'utilisateur", value : `Le nom d'utilisateur est ${targetUser.username}`},
                { name: '\u200b', value: '\u200b' },
                {name : "Tag d'utilisateur", value : `Le tag d'utilisateur est ${targetUser.tag}`},
                { name: '\u200b', value: '\u200b' },
                {name : "L'id de l'utilisateur", value : `L'id d'utilisateur est ${targetUser.id}`}
            )
      
    const userAvatar = targetUser.displayAvatarURL({ dynamic: true });
    embed_profile.setThumbnail(userAvatar);
      
    message.channel.send({embeds : [embed_profile]});
    
    }

    if (message.content.startsWith("%help")){
        console.log(`La commande %help a été détectée, l'auteur est ${message.author.username}`)

        const help_embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Commandes")
            .setDescription("Affiche toutes les commandes possible avec skyz bot")
            .addFields(
                { name: '\u200b', value: '\u200b' },
                {name : "%help", value : "Commande = %help. Permet d'afficher toutes les commandes"},
                {name : "%read", value : "Commande = %read. Permet d'envoyer du texte anonymement"},
                {name : "%id", value : "Commande = %id. Permet de récuperer votre ou l'id d'un autre utilisateur"},
                {name : "%ping", value : "Commande = %ping. Permet de répondre pong"},
                {name : "%nom", value :"Commande = %nom. Surprise !"},
                {name : "%avatar", value : "Commande = %avatar. Permet de récuperer l'avatar d'un utilisateur"},
                {name : "%profile", value : "Commande = %profile. Permet d'afficher le profile de l'utilisateur mentionné"},
                {name : "%ban", value : "Commande = %ban. Permet de bannir des membres, cette commande ne peux que être utilisée par certain rôles"},
                {name : "%kick", value : "Commande = %kick. Permet d'expulser des membres, cette commande ne peux que être utilisée par certain rôles"},
            )
            .setTimestamp()
        message.channel.send({embeds : [help_embed]});
    }

    if (message.content.startsWith("%ban")){
        console.log(`La commande %ban a été détectée, l'auteur est ${message.author.username}`)

        const memberToBan = message.mentions.members.first();

        if (!memberToBan) {
            message.channel.send("Vous devez mentionnez le membre a bannir");
            return;
        }

        if (!message.member.permissions.has("BanMembers")){
            message.reply("Vous n'avez pas le permissions de ban un membre");
            return;
        }

        memberToBan.ban()
            .then(bannedMember => {
                message.reply(`${bannedMember.user.username} a été banni`)

            })

            .catch(error => {
                console.error(error)
                message.reply(`Un problème est survenut lors du bannissement de ${bannedMember.user.username}`)
            })
    }

    if (message.content.startsWith("%kick")){
        console.log (`La commande %kick a ét détectéer, l'auteur est ${message.author.username}`)

        const memberToKick = message.mentions.members.first()

        if (!memberToKick){
            message.channel.send("Vous devez mentionnez le membre a expulser")
            return;
        }

        if (!message.member.permissions.has("KickMembers")){
            message.reply("Vous n'avez pas ma permission d'expulser des membres")
            return;
        }

        memberToKick.kick()
            .then(kickedMember => {
                message.reply(`${kickedMember.user.username} a été expulsé`)
            })

            .catch(error => {
                console.error(error)
                message.reply(`Un problème est survenu lors de l'expulsion de ${kickedMember.user.username}`)
            })
    }
});

client.login("YOUR TOKEN")
