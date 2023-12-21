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
        .setName('set-money')
        .setDescription('Set someones balance')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('Whos balance are you setting')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('amount')
                .setDescription('What are you setting it at')
                .setRequired(true)
        ).addStringOption(option =>
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
            eco.balance.set(amount, target.id, guild.id);

            embed
                .setTitle('Coins successfully set')
                .setDescription(`I have successfully set ${target}'s coins to ${amount}`)
                .setColor('Green')
                .setTimestamp();

            interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (interaction.options.getString('type') === 'Bank') {
            eco.bank.set(amount, target.id, guild.id);

            embed
                .setTitle('Bank Value successfully set')
                .setDescription(`I have successfully set ${target}'s bank value to ${amount}`)
                .setColor('Green')
                .setTimestamp();

            interaction.reply({ embeds: [embed], ephemeral: true });
        }

    }
};
