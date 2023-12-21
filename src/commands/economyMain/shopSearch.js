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
        .setName('shop-search')
        .setDescription('Search for an item in the shop')
        .addStringOption(option =>
            option
                .setName('Item-name')
                .setDescription('The name of the item you are looking for')
                .setRequired(true)
        ),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const embed = new EmbedBuilder();
        const { guild } = interaction;

        const query = interaction.options.getString('Item-name');
        const item = eco.shop.finditem(query, guild.id);

        if (!item) {
            return interaction.reply({
                content: `There is no item in the shop with the ID or name: ${query}`,
                ephemeral: true
            });
        }

        embed
            .setTitle('Item Information')
            .setColor('Random')
            .setFields({
                name: 'Item ID:',
                value: `${item.id}`,
                inline: true
            }, {
                name: 'Item Name:',
                value: `${item.name}`,
                inline: true
            }, {
                name: 'Item Price:',
                value: `${item.price} Coins`,
                inline: true
            }, {
                name: 'Item Description:',
                value: `${item.description}`,
                inline: true
            }, {
                name: 'Item Limit Per Person:',
                value: `${item.maxAmount || 'Infinity'}`,
                inline: true
            }, {
                name: 'Role Given On Purchase:',
                value: `${item.role || 'No role is given'}`,
                inline: true
            }, {
                name: 'Hidden In Shop:',
                value: `${item.custom.hidden ? 'Yes' : 'No'}`,
                inline: true
            }, {
                name: 'Locked:',
                value: `${item.custom.locked ? 'Yes' : 'No'}`,
                inline: true
            });

        interaction.reply({ embeds: [embed] });
    }
};
