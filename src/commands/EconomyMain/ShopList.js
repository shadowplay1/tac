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
        .setName('shop-list')
        .setDescription('List all the items in the shop'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        const { guild, member } = interaction;

        const shopList = eco.shop.all(guild.id);

        let ListMap = shopList.map(item => `ID: **${item.id}** = **${item.name}** (**${item.price}** coins)\nDescription: ${item.description}\nMax Per Person: ${item.maxAmount || 'Infinity'}\nRole: ${item.role || 'No role with this item'}`)
        if (!shopList.length) return interaction.reply({ content: 'There is nothing in the shop', ephemeral: true })

        embed
            .setTitle(`**${guild.name}'a Shop...**`)
            .setTimestamp()
            .setColor('Random')
            .setDescription(ListMap.join('\n'))

        interaction.reply({ embeds: [embed] })
    }
}