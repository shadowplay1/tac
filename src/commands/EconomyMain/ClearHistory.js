//                  THIS WAS MADE BY:
//                       DONALD D.
//                  Discord: donaldd1
//                Github: theautiscoder
//
//                DO NOT EDIT ANYTHING BELLOW UNLESS
//                   YOU KNOW WHAT YOURE DOING

const { SlashCommandBuilder } = require('discord.js');
const eco = require('../../Database/EcoDB');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear-own-history')
        .setDescription('⚠️ | Delete everything from YOUR purchase history'),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, member } = interaction;

        const history = eco.history.fetch(member.id, guild.id);

	    if (!history.length) {
            return interaction.reply({
            		content: 'You have nothing in your history...',
            		ephemeral: true
            });
        }
        eco.history.clear(member.id, guild.id);

        interaction.reply({
            content: 'I have successfully wiped everything from your purchase history',
            ephemeral: true
        });
    }
};
