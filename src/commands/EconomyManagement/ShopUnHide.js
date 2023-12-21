//                  THIS WAS MADE BY:
//                       DONALD D.
//                  Discord: donaldd1
//                Github: theautiscoder
//
//                DO NOT EDIT ANYTHING BELLOW UNLESS
//                   YOU KNOW WHAT YOURE DOING

const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const eco = require('../../Database/EcoDB');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop-show-item')
        .setDescription('Unhide an item from the shop')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option
                .setName('item-name')
                .setDescription('What item are you unhiding')
                .setRequired(true)
        ),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild } = interaction;

        const item = interaction.options.getString('item-name');
        const shopItem = eco.shop.findItem(item, guild.id);

        if (!shopItem) return interaction.reply({
            content: 'I cannot find this item in the shop',
            ephemeral: true
        });

        if (!shopItem.custom.hidden) return interaction.reply({
            content: 'This item is already visible',
            ephemeral: true
        });

        shopItem.setCustom({
            hidden: false,
            hiddenSince: null
        });

        interaction.reply({
            content: `You have successfully made the following item from the shop visible again: ${item}`,
            ephemeral: true
        });

    }
};
