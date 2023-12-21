//                  THIS WAS MADE BY:            
//                       DONALD D.
//                  Discord: donaldd1
//                Github: theautiscoder
//
//                DO NOT EDIT ANYTHING BELLOW UNLESS
//                   YOU KNOW WHAT YOURE DOING

const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, Client, WebhookClient } = require('discord.js');
const eco = require('../../Database/EcoDB')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coins-leaderboard')
        .setDescription('Check this guild\'s coins leaderboard'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        const { guild, member } = interaction;

        let LB = eco.balance.leaderboard(guild.id);
        if (!LB.length) {
            return interaction.reply({
                content: `No one has $1 or more in coins, No leaderboard can be displayed`
            })
        }

        let leaderboard = await LB.map((value, index) => {
            return `\`${index + 1}\`<@${value.userID}>'s Coins: ${value.money}`
        })

        embed
            .setColor('Random')
            .setTitle(`**${guild.name}'s Coins Leaderboard...**`)
            .setDescription(leaderboard.join('\n'))

        interaction.reply({ embeds: [embed] })
    }
}