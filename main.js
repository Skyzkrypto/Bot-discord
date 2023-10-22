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

    client.user.setPresence({
        activities: {
            name : "Besion d'aide ? => %help",
            type : "WATCHING",
        },
        status : "online"
    })
});

const prefix = "%"
const warnings = {};

client.on('messageCreate', async (message) => {
    const userID = message.author.id;
    const members_serveur = message.channel.guild.members.cache;

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
    }


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
                
                embed_avatar = new EmbedBuilder()
                    .setColor('#0099ff')
                    .setImage(avatarURL)
                    .setTitle(`Avatar de ${targetUser.username}`)
    
                message.channel.send({embeds: [embed_avatar]});
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
                {name: '\u200b', value: '\u200b' },
                {name : "Nom d'utilisateur", value : `Le nom d'utilisateur est ${targetUser.username}`},
                {name: '\u200b', value: '\u200b' },
                {name : "Tag d'utilisateur", value : `Le tag d'utilisateur est ${targetUser.tag}`},
                {name: '\u200b', value: '\u200b' },
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
            .setDescription("Affiche toutes les commandes possibles avec skyz bot")
            .addFields(
                {name: '\u200b', value: '\u200b' },
                {name : "%help", value : "Commande = %help. Permet d'afficher toutes les commandes"},
                {name : "%read", value : "Commande = %read. Permet d'envoyer du texte anonymement"},
                {name : "%id", value : "Commande = %id. Permet de récuperer votre ou l'id d'un autre utilisateur"},
                {name : "%ping", value : "Commande = %ping. Permet de répondre pong"},
                {name : "%nom", value :"Commande = %nom. Surprise !"},
                {name : "%avatar", value : "Commande = %avatar. Permet de récuperer l'avatar d'un utilisateur"},
                {name : "%profile", value : "Commande = %profile. Permet d'afficher le profile de l'utilisateur mentionné"},
                {name : "%ban", value : "Commande = %ban. Permet de bannir des membres, cette commande ne peux que être utilisée par certain rôles"},
                {name : "%kick", value : "Commande = %kick. Permet d'expulser des membres, cette commande ne peux que être utilisée par certain rôles"},
                {name : "%thread", value : "Commande = %thread. Permet de créer un thread"},
                {name : "%say", value : "Commande = %say. Commande réservée aux Admin, elle permet d'evoyer un message sur les tous les serveurs dont le bot fait parti."},
                {name : "%mute", value : "Commande = %mute. Commande réservée aux modérateurs, super modérateurs et Admins, elle permet de mute un membre. Attention cette commande ne fonctionne que sur un serveur"},
                {name : "%unmute", value : "Commande = %mute. Commande réservée aux modérateurs, super modérateurs et Admins, elle permet de demute des membres mutes."},
                {name : "%warn", value:"Commande = %warn. Commande réservée aux modérateurs, super modérateurs et Admins, permet de warn un utilisateur"},
                {name : "%checkWarnings", value:"Commande = %checkWarnings. Commande réservée aux modérateurs, super modérateurs et Admins, permet de vérifier les warns d'un utilisateur"}
            )
            .setTimestamp()
        message.channel.send({embeds : [help_embed]});
    }

    if (message.content.startsWith("%ban")){
        console.log(`La commande %ban a été détectée, l'auteur est ${message.author.username}`)

        const memberToBan = message.mentions.members.first();

        if (memberToBan == client){
            message.reply("Vous ne pouvez pas ban le bot")
            return;
        }

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

        if (memberToKick == client){
            message.reply("Vous ne pouvez pas expulser le bot");
            return;
        }

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

    if (message.content.startsWith("%thread")){
        console.log(`La commande %thread a été détectée, l'auteur est ${message.author.username}`)
        name_thread = `* Thread de ${message.author.username}`

        message.channel.send(name_thread)
        message.startThread({
            name : `Thread de ${message.author.username}`,
            autoArchiveDuration: 60,
            type: 'GUILD_PUBLIC_THREAD'
        })


    }

    if (message.content.startsWith("%say")) {
        console.log(`Commande %say détectée, l'auteur est ${message.author.username}`);
    
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.channel.send("Vous n'avez pas la permission d'utiliser cette commande");
            return;
        }
    
        const guildsArray = Array.from(client.guilds.cache.values());
        const messageContent = message.content.substring(5);
    
        for (const server of guildsArray) {
            try {
                const defaultChannel = server.systemChannel || server.channels.cache.first();
                if (defaultChannel) {
                    defaultChannel.send(`${message.author.username} envoie : ${messageContent}`);
                    message.delete()
                }
            } catch (error) {
                console.error(`Impossible d'envoyer le message à ${server.name}`);
            }
        }
    }

    if (message.content.startsWith(`<@1149974000613732412>`)){
        console.log(`Mention détecter, ${message.author}`)

        const mention_embeds = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle("Aide")
            .addFields(
                {name : "Besion d'aide ?", value : "====="},
                {name : "Utilise la commande %help pour devenir un pro de skyz bot !", value : "====="},
            )
        message.channel.send({embeds : [mention_embeds]})
    }

    if (message.content.startsWith("%mute")) {
        console.log(`Command %mute détectée, l'auteur est ${message.author}`);
    
        if (!message.member.permissions.has("MuteMembers")) {
            message.reply("Vous n'avez pas la permission de mute des membres");
            return;
        }
    
        if (message.mentions.members.size === 0) {
            message.reply("Vous devez mentionner un membre");
            return;
        }
    
        const memberToMute = message.mentions.members.first();

        if (memberToMute == client){
            message.reply("Vous ne pouvez pas mute le bot")
            return;
        }
    
        memberToMute.roles.add("1136228636761018448")
            .then(() => {
                message.reply(`Vous avez mute ${memberToMute.user.tag}`);
            })
            .catch(error => {
                console.error(`Une erreur s'est produite lors de la tentative de mute : ${error}`);
                message.reply("Une erreur s'est produite lors de la tentative de mute du membre.");
            });
        
            const roleToRemove = message.guild.roles.cache.find(role => role.id === "1097238913778716743");
            if (!roleToRemove) {
                message.reply("Le rôle à retirer n'a pas été trouvé.");
                return;
            }
    }

    if (message.content.startsWith("%unmute")) {
        console.log(`Commande %unmute détectée, l'auteur est ${message.author.username}`);
    
        if (!message.member.permissions.has("MuteMembers")) {
            message.reply("Vous n'avez pas la permission de unmute des membres");
            return;
        }
    
        if (message.mentions.members.size === 0) {
            message.reply("Vous devez mentionner un membre à unmute");
            return;
        }
    
        const memberToUnmute = message.mentions.members.first();
    
        const roleToRemove = message.guild.roles.cache.find(role => role.id === "1136228636761018448");
        if (!roleToRemove) {
            message.reply("Le rôle à retirer n'a pas été trouvé.");
            return;
        }
    
        memberToUnmute.roles.remove(roleToRemove)
            .then(() => {
                message.reply(`Vous avez unmute ${memberToUnmute.user.tag}`);
                memberToUnmute.roles.add("1097238913778716743")

            })
            .catch(error => {
                console.error(`Une erreur s'est produite lors de la tentative d'unmute : ${error}`);
                message.reply(`Une erreur s'est produite lors de la tentative d'unmute du membre.`);
            });
    }
    if (message.content.startsWith("%warn")) {
        console.log(`Commande warn détectée, l'auteur est ${message.author.username}`);
    
        if (!message.member.permissions.has("MuteMembers")) {
            message.reply("Vous n'avez pas la permission de warn des membres");
            return;
        }
        if (message.mentions.members.size === 0) {
            message.reply("Vous devez mentionner un membre à warn");
            return;
        }
        const memberToWarn = message.mentions.members.first();
        const reason = message.content.slice("%warn".length).trim();
    
        if (!warnings[memberToWarn.id]) {
            warnings[memberToWarn.id] = [];
        }
    
        warnings[memberToWarn.id].push(reason);
    
        console.log(`Vous avez warn ${memberToWarn.user.username} pour la raison : ${reason}`);
        message.reply(`Vous avez warn ${memberToWarn.user.username} pour la raison : ${reason}`);
    
        memberToWarn.send(`Vous avez été averti sur le serveur "${message.guild.name}" pour la raison : ${reason}`);
    
    }
    if (message.content.startsWith("%checkWarnings")) {
        console.log(`Commande warnings détectée, l'auteur est ${message.author.username}`);
    
        if (!message.member.permissions.has("MuteMembers")) {
            message.reply("Vous n'avez pas la permission de voir les avertissements des membres");
            return;
        }
        if (message.mentions.members.size === 0) {
            message.reply("Vous devez mentionner un membre pour voir ses avertissements");
            return;
        }
        const memberToCheck = message.mentions.members.first();
    
        const userWarnings = warnings[memberToCheck.id] || [];
    
        if (userWarnings.length === 0) {
            message.channel.send(`${memberToCheck.user.username} n'a pas d'avertissements.`);
        } else {
            message.channel.send(`${memberToCheck.user.username} a les avertissements suivants :`);
            userWarnings.forEach((warning, index) => {
                message.channel.send(`Avertissement ${index + 1}: ${warning}`);
            });
        }
    }
    
});

client.login("YOUR TOKEN")
    .catch(error => {
        console.error(`Erreur lors de la connexion du bot : ${error}`);
    });
