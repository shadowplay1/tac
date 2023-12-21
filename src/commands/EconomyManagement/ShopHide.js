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
        .setName('shop-hide')
        .setDescription('Hide something in the shop')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option
                .setName('item-name')
                .setDescription('What item are you hiding')
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

        if (shopItem.custom.hidden) return interaction.reply({
            content: 'This item is already hidden',
            ephemeral: true
        });

        shopItem.setCustom({
            hidden: true,
            hiddenSince: Date.now()
        });

        interaction.reply({
            content: `You have successfully hid the following item from the shop: ${item}`,
            ephemeral: true
        });

    }
};
