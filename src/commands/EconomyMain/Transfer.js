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
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const embed = new EmbedBuilder();
        const { guild, member } = interaction;

        const target = interaction.options.getMember('user');
        const amount = interaction.options.getNumber('amount');

        const senderbalance = eco.balance.get(member.id, guild.id);

        if (senderbalance > amount) return interaction.reply({
            content: 'You are attempting to send them more coins than you have',
            ephemeral: true
        });

        eco.balance.subtract(amount, member.id, guild.id);
        eco.balance.add(amount, target.id, guild.id);

        embed
            .setTimestamp()
            .setTitle('**Coins Transfer...**')
            .setDescription(`You have successfully sent ${amount} coins to ${target}`);
        interaction.reply({ embeds: [embed] });

    }
};
