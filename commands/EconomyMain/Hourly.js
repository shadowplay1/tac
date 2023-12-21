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
        .setName('hourly')
        .setDescription('Collect your hourly amount'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        const { guild, member } = interaction;

        let hourly = eco.rewards.getHourly(member.id, guild.id);
        if (!hourly.claimed) {
            embed
                .setDescription('You have already claimed your hourly reward... Stop trying to get more free money... Wait your time...')
                .setColor('Red')
            return interaction.reply({ embeds: [embed] })
        }

        embed
            .setTitle('**Hourly Reward...**')
            .setDescription(`You have recieved ${hourly.reward} coins from your Hourly Reward.`)
            .setColor('Random')

        interaction.reply({ embeds: [embed] })
    }
}