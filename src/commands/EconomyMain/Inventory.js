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
        .setName('inventory')
        .setDescription('Check your inventory'),
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

        const userInventory = inv.filter(item => !item.custom.hidden)

        const cleanInventory = [...new Set(userInventory.map(item => item.name))]
            .map(itemName => shop.find(shopItem => shopItem.name == itemName))
            .map(item => {
                const quantity = userInventory.filter(invItem => invItem.name == item.name).length

                return {
                    quantity,
                    totalPrice: item.price * quantity,
                    item
                }
            })

        embed
            .setTitle(`**${member.user.displayName}'s Inventory...**`)
            .setDescription(cleanInventory
                .map(
                    (data, index) =>
                    `${index + 1} - **x${data.quantity} ${data.item.custom.emoji} ` +
                    `${data.item.name}** (ID: **${data.item.id}**) ` +
                    `for **${data.totalPrice}** coins`
                )
                .join('\n'))
            .setColor('Random')
        interaction.reply({ embeds: [embed] })
    }
}