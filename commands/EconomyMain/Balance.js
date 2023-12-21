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
        .setName('balance')
        .setDescription('Check your balance'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        const { guild, member } = interaction;

        let balance = eco.balance.fetch(member.id, guild.id);
        let bank = eco.bank.fetch(member.id, guild.id);

        if (!balance) balance = 0;
        if (!bank) bank = 0;

        embed
            .setTitle(`**${member.user.displayName}'s Balance...**`)
            .setFields({
                name: 'Coins',
                value: `${balance}`,
                inline: true
            }, {
                name: 'Bank',
                value: `${bank}`,
                inline: true
            })
            .setTimestamp()
            .setColor('Random')

        interaction.reply({ embeds: [embed] })
    }
}