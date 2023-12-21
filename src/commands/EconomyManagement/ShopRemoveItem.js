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
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder();
        const { guild, member } = interaction;

        const Item1 = interaction.options.getString('item-name');
        const Item2 = eco.shop.getItem(Item1, guild.id);
        if (!Item2) return interaction.reply({ content: `I cannot find ${Item1} in the shop. Make sure it is spelt correctly`, ephemeral: true });

        eco.shop.removeItem(Item1, guild.id); // This is because Item2 is getting the item, Item1 is the name of the item

        embed
            .setTimestamp()
            .setTitle('Shop Removal Success')
            .setColor('Green')
            .setDescription(`Successfully removed ${Item1} from the shop`);

        interaction.reply({ embeds: [embed] });
    }
};
