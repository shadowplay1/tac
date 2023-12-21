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
        .setName('withdraw')
        .setDescription('Take coins out of your bank')
        .addNumberOption(option =>
            option
            .setName('amount')
            .setDescription('How much are you taking out of your bank?')
            .setRequired(true)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        const { guild, member } = interaction;

        const amount = interaction.options.getNumber('amount');

        let bank = eco.bank.fetch(member.id, guild.id);

        if (amount > bank) return interaction.reply({
            content: 'Stop trying to take money out of your bank... You are taking out too much... You are broke :)',
            ephemeral: true
        })

        eco.bank.subtract(amount, member.id, guild.id)
        eco.balance.add(amount, member.id, guild.id)

        embed
            .setTitle(`🏦 -> 💵 Withdraw Success`)
            .setDescription(`You have successfully taken out ${amount} coins from your bank :)`)
            .setColor('Green')
        interaction.reply({ embeds: [embed] })
    }
}