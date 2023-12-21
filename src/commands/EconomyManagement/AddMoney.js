//                  THIS WAS MADE BY:
//                       DONALD D.
//                  Discord: donaldd1
//                Github: theautiscoder
//
//                DO NOT EDIT ANYTHING BELLOW UNLESS
//                   YOU KNOW WHAT YOURE DOING

const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const eco = require('../../Database/EcoDB');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-money')
        .setDescription('Add money to someone')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Who are you adding money to')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('amount')
                .setDescription('How much are you adding')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('type')
                .setDescription('Bank or Cash?')
                .setChoices({
                    name: 'Coins',
                    value: 'Coins',
                }, {
                    name: 'Bank',
                    value: 'Bank'
                })
                .setRequired(true)
        ),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild } = interaction;
        const embed = new EmbedBuilder();

        const target = interaction.options.getMember('target');
        const amount = interaction.options.getNumber('amount');

        if (interaction.options.getString('type') === 'Coins') {
            eco.balance.add(amount, target.id, guild.id);

            embed
                .setTitle('Coins successfully added')
                .setDescription(`I have successfully added ${amount} coins to ${target}'s balance!`)
                .setColor('Green')
                .setTimestamp();

            interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.options.getString('type') === 'Bank') {
            eco.bank.add(amount, target.id, guild.id);

            embed
                .setTitle('Coins successfully added')
                .setDescription(`I have successfully added ${amount} coins to ${target}'s Bank Account!`)
                .setColor('Green')
                .setTimestamp();

            interaction.reply({ embeds: [embed], ephemeral: true });
        }

    }
};
