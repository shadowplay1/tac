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
        .setName('monthly')
        .setDescription('Collect your monthly amount'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        const { guild, member } = interaction;

        let monthly = eco.rewards.getMonthly(member.id, guild.id);
        if (!monthly.claimed) {
            embed
                .setDescription('You have already claimed your Monthly reward... Stop trying to get more free money...')
                .setColor('Red')
            return interaction.reply({ embeds: [embed] })
        }

        embed
            .setTitle('**Monthly Reward...**')
            .setDescription(`You have recieved ${monthly.reward} coins from your Monthly Reward.`)
            .setColor('Random')

        interaction.reply({ embeds: [embed] })
    }
}