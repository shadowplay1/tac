//                  THIS WAS MADE BY:            
//                       DONALD D.
//                  Discord: donaldd1
//                Github: theautiscoder
//
//                DO NOT EDIT ANYTHING BELLOW UNLESS
//                   YOU KNOW WHAT YOURE DOING

const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, Client, WebhookClient } = require('discord.js');
const eco = require('../../Database/EcoDB')

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
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        const { guild, member } = interaction;
        const Item = interaction.options.getString('item-name');
        const Amount = interaction.options.getNumber('amount');

        const InvItem = eco.inventory.findItem(member.id, guild.id(item => item.id == parseInt(Item) || item.name == Item))

        if (!InvItem) return interaction.reply({
            content: 'I cannot find this item in your inventory',
            ephemeral: true
        })

        if (InvItem.custom.locked) return interaction.reply({
            content: 'You cannot sell this item, it is locked..',
            ephemeral: true
        })

        const sellResult = InvItem.sell(InvItem, Amount)

        if (!sellResult.status) return interaction.reply({
            content: 'Failed to sell this item',
            ephemeral: true
        })

        interaction.reply({
            content: `You successfully sold ${Item} for ${sellResult.totalPrice} coins`,
            ephemeral: true
        })

    }
}