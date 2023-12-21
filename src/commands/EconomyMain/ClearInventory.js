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
        .setName('clear-own-inventory')
        .setDescription('⚠️ | Delete everything from YOUR Inventory'),
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
            content: `You have nothing in your inventory...`,
            ephemeral: true
        })

        eco.inventory.clear(member.id, guild.id)

        interaction.reply({
            content: 'I have successfully wiped everything from your inventory',
            ephemeral: true
        })
    }
}