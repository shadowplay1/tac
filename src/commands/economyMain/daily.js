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
        .setName('daily')
        .setDescription('Collect your daily amount'),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const embed = new EmbedBuilder();
        const { guild, member } = interaction;

        const daily = eco.rewards.getDaily(member.id, guild.id);

        if (!daily.claimed) {
            embed
                .setDescription('You have already claimed your daily reward... Stop trying to get more free money...')
                .setColor('Red');
            return interaction.reply({ embeds: [embed] });
        }

        embed
            .setTitle('**Daily Reward...**')
            .setDescription(`You have recieved ${daily.reward} coins from your Daily Reward.`)
            .setColor('Random');

        interaction.reply({ embeds: [embed] });
    }
};
