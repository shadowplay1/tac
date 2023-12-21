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
        .setName('transfer')
        .setDescription('Send someone money')
        .addUserOption(option =>
            option
            .setName('user')
            .setDescription('Who are you sending money to')
            .setRequired(true)
        )
        .addNumberOption(option =>
            option
            .setName('amount')
            .setDescription('How much are you sending them')
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
        const Target = interaction.options.getMember('user');
        const Amount = interaction.options.getNumber('amount');

        const senderbalance = eco.balance.get(member.id, guild.id);

        if (senderbalance > Amount) return interaction.reply({
            content: `You are attempting to send them more coins than you have`,
            ephemeral: true
        })

        eco.balance.subtract(Amount, member.id, guild.id);
        eco.balance.add(Amount, Target.id, guild.id);

        embed
            .setTimestamp()
            .setTitle('**Coins Transfer...**')
            .setDescription(`You have successfully sent ${Amount} coins to ${Target}`)
        interaction.reply({ embeds: [embed] })

    }
}