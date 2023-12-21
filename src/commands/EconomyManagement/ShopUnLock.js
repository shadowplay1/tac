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
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        const { guild, member } = interaction;

        const item = interaction.options.getString('item-name');

        const ShopItem = eco.shop.findItem(item1 => item1.id == parseInt(item) || item1.name == item);

        if (!ShopItem) return interaction.reply({
            content: `I cannot find this item in the shop`,
            ephemeral: true
        })

        if (!ShopItem.custom.locked) return interaction.reply({
            content: 'This item is already unlocked',
            ephemeral: true
        })

        ShopItem.setCustom({
            locked: false,
            lockedSince: null
        })

        interaction.reply({
            content: `You have successfully unlocked the following item in the shop: ${item}`,
            ephemeral: true
        })

    }
}