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
        .setName('shop-unlock')
        .setDescription('Unlock a locked item in the shop')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option
                .setName('item-name')
                .setDescription('What item are you unlocking')
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

        if (!shopItem.custom.locked) return interaction.reply({
            content: 'This item is already unlocked',
            ephemeral: true
        });

        shopItem.setCustom({
            locked: false,
            lockedSince: null
        });

        interaction.reply({
            content: `You have successfully unlocked the following item in the shop: ${item}`,
            ephemeral: true
        });

    }
};
