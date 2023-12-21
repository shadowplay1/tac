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
        .setName('weekly')
        .setDescription('Collect your weekly amount'),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction) {
        const embed = new EmbedBuilder();
        const { guild, member } = interaction;

        const weekly = eco.rewards.getWeekly(member.id, guild.id);

        if (!weekly.claimed) {
            embed
                .setDescription('You have already claimed your weekly reward... Stop trying to get more free money...')
                .setColor('Red');

	    return interaction.reply({ embeds: [embed] });
        }

        embed
            .setTitle('**Weekly Reward...**')
            .setDescription(`You have recieved ${weekly.reward} coins from your weekly Reward.`)
            .setColor('Random');

        interaction.reply({ embeds: [embed] });
    }
};
