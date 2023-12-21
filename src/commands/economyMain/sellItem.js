//                  THIS WAS MADE BY:
//                       DONALD D.
//                  Discord: donaldd1
//                Github: theautiscoder
//
//                DO NOT EDIT ANYTHING BELLOW UNLESS
//                   YOU KNOW WHAT YOURE DOING

const { SlashCommandBuilder } = require('discord.js');
const eco = require('../../Database/EcoDB');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sell')
        .setDescription('Sell an item in your inventory')
        .addStringOption(option =>
            option
                .setName('item-name')
                .setDescription('What item in your inventory are you selling')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('amount')
                .setDescription('How many are you selling')
                .setRequired(true)
        ),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, member } = interaction;

        const item = interaction.options.getString('item-name');
        const amout = interaction.options.getNumber('amount');

        const inventoryItem = eco.inventory.findItem(item, member.id, guild.id);

        if (!inventoryItem) return interaction.reply({
            content: 'I cannot find this item in your inventory',
            ephemeral: true
        });

        if (inventoryItem.custom.locked) return interaction.reply({
            content: 'You cannot sell this item, it is locked..',
            ephemeral: true
        });

        const sellResult = inventoryItem.sell(inventoryItem, amout);

        if (!sellResult.status) return interaction.reply({
            content: 'Failed to sell this item',
            ephemeral: true
        });

        interaction.reply({
            content: `You successfully sold ${item} for ${sellResult.totalPrice} coins`,
            ephemeral: true
        });

    }
};
