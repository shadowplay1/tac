//                  THIS WAS MADE BY:
//                       DONALD D.
//                  Discord: donaldd1
//                Github: theautiscoder
//
//                DO NOT EDIT ANYTHING BELLOW UNLESS
//                   YOU KNOW WHAT YOURE DOING

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const eco = require('../../Database/EcoDB');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coins-leaderboard')
        .setDescription('Check this guild\'s coins leaderboard'),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const embed = new EmbedBuilder();
        const { guild } = interaction;

        const lb = eco.balance.leaderboard(guild.id);

        if (!lb.length) {
            return interaction.reply({
                content: 'No one has $1 or more in coins, No leaderboard can be displayed'
            });
        }

        const leaderboard = await lb.map((value, index) => {
            return `\`${index + 1}\`<@${value.userID}>'s Coins: ${value.money}`;
        });

        embed
            .setColor('Random')
            .setTitle(`**${guild.name}'s Coins Leaderboard...**`)
            .setDescription(leaderboard.join('\n'));

        interaction.reply({ embeds: [embed] });
    }
};
