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
        .setName('shop-remove-item')
        .setDescription('Remove an item from the shop')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option
                .setName('item-name')
                .setDescription('The name of the item you are removing')
                .setRequired(true)
        ),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const embed = new EmbedBuilder();
        const { guild } = interaction;

        const itemName = interaction.options.getString('item-name');
        const shopItem = eco.shop.getItem(itemName, guild.id);

        if (!shopItem) {
            return interaction.reply({
                content: `I cannot find ${itemName} in the shop. Make sure it is spelt correctly`,
                ephemeral: true
            });
        }

        // This is because shopItem is getting the item, itemName is the name of the item
        eco.shop.removeItem(itemName, guild.id);

        embed
            .setTimestamp()
            .setTitle('Shop Removal Success')
            .setColor('Green')
            .setDescription(`Successfully removed ${itemName} from the shop`);

        interaction.reply({ embeds: [embed] });
    }
};
