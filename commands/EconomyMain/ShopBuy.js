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
        .setName('shop-buy')
        .setDescription('Buy an item from the shop')
        .addStringOption(option =>
            option
            .setName('item-name')
            .setDescription('What item are you buying?')
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

        const Item1 = interaction.options.getString('item-name');
        const Item2 = eco.shop.findItem(Item1, guild.id)
        if (!Item2) return interaction.reply({ content: `Could not find item name or ID: ${Item1}`, ephemeral: true })

        const PlayerBalance = eco.balance.fetch(member.id, guild.id)
        if (Item2.price > PlayerBalance) return interaction.reply({ content: `You are not able to afford this`, ephemeral: true })

        if (member.roles.cache.has(Item2.role)) return interaction.reply({ content: `You cannot buy this item, you already have the role that comes with it` })

        const Purchase = eco.shop.buy(Item1, member.id, guild.id);
        if (Purchase.quantity === 'max') return interaction.reply({ content: `You already have the max amount of this item`, ephemeral: true })

        if (Item2.role) guild.members.cache.get(member.id).roles.add(guild.roles.cache.get(Item2.role))

        interaction.reply({
            content: `You have purchased the following item: ${Item2.name} for ${Item2.price} coins!`,
            ephemeral: true
        })
    }
}