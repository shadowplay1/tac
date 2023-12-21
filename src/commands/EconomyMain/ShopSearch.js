//                  THIS WAS MADE BY:            
//                       DONALD D.
//                  Discord: donaldd1
//                Github: theautiscoder
//
//                DO NOT EDIT ANYTHING BELLOW UNLESS
//                   YOU KNOW WHAT YOURE DOING

const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    Client,
    PermissionFlagsBits,
    WebhookClient,
} = require('discord.js');

const eco = require('../../Database/EcoDB');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop-search')
        .setDescription('Search for an item in the shop')
        .addStringOption(option =>
            option
            .setName('item-name')
            .setDescription('The name of the item you are looking for')
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

        const SearchItem = interaction.options.getString('item-name');
        const Item = eco.shop.findItem(SearchItem, guild.id);
        if (!Item) return interaction.reply({ content: `There is no item in the shop with the ID or name: ${SearchItem}`, ephemeral: true })

        embed
            .setTitle('Item Information')
            .setColor('Random')
            .setFields({
                name: 'Item ID:',
                value: `${Item.id}`,
                inline: true
            }, {
                name: 'Item Name:',
                value: `${Item.name}`,
                inline: true
            }, {
                name: 'Item Price:',
                value: `${Item.price} Coins`,
                inline: true
            }, {
                name: 'Item Description:',
                value: `${Item.description}`,
                inline: true
            }, {
                name: 'Item Limit Per Person:',
                value: `${Item.maxAmount || 'Infinity'}`,
                inline: true
            }, {
                name: 'Role Given On Purchase:',
                value: `${Item.role || 'No role is given'}`,
                inline: true
            }, {
                name: 'Hidden In Shop:',
                value: `${Item.custom.hidden ? 'Yes' : 'No'}`,
                inline: true
            }, {
                name: 'Locked:',
                value: `${Item.custom.locked ? 'Yes' : 'No'}`,
                inline: true
            })

        interaction.reply({ embeds: [embed] })
    }
}