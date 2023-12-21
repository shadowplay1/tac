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
        .setName('deposit')
        .setDescription('Put coins into your bank')
        .addNumberOption(option =>
            option
            .setName('amount')
            .setDescription('How much are you putting into your bank')
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

        let balance = eco.balance.fetch(member.id, guild.id);

        if (amount > balance) return interaction.reply({
            content: 'Stop trying to put money in your bank if your broke... You dont have this much in coins...',
            ephemeral: true
        })

        eco.balance.subtract(amount, member.id, guild.id)
        eco.bank.add(amount, member.id, guild.id)

        embed
            .setTitle(`💵 -> 🏦 Depost Success`)
            .setDescription(`You have successfully put ${amount} coins into your bank :)`)
            .setColor('Green')
        interaction.reply({ embeds: [embed] })
    }
}