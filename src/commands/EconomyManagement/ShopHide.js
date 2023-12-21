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
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        const { guild, member } = interaction;

        const item = interaction.options.getString('item-name');

        const ShopItem = eco.shop.findItem(guild.id, item1 => item1.id == parseInt(item) || item1.name == item);

        if (!ShopItem) return interaction.reply({
            content: `I cannot find this item in the shop`,
            ephemeral: true
        })

        if (ShopItem.custom.hidden) return interaction.reply({
            content: 'This item is already hidden',
            ephemeral: true
        })

        ShopItem.setCustom({
            hidden: true,
            hiddenSince: Date.now()
        })

        interaction.reply({
            content: `You have successfully hid the following item from the shop: ${item}`,
            ephemeral: true
        })

    }
}