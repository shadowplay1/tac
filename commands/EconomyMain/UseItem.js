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
        .setName('use-item')
        .setDescription('Use an item from your inventory')
        .addStringOption(option =>
            option
            .setName('item-name')
            .setDescription('What item are you using?')
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

        const inv = eco.inventory.fetch(member.id, guild.id);
        if (!inv.length) return interaction.reply({
            content: `You have nothing in your inventory... Buy something...`,
            ephemeral: true
        })

        const Item = interaction.options.getString('item-name')
        const ItemToUse = eco.inventory.findItem(Item, member.id, guild.id)
        if (!ItemToUse) return interaction.reply({
            content: `You cannot find an item called ${Item} in your inventory`,
            ephemeral: true
        })

        ItemToUse.use(Item, member.id, guild.id)

        embed
            .setTitle(`**${member.user.displayName}'s Used ${Item}**`)
            .setDescription(ItemToUse.message)
            .setColor('Random')
        interaction.reply({ embeds: [embed] })
    }
}