//                  THIS WAS MADE BY:
//                       DONALD D.
//                  Discord: donaldd1
//                Github: theautiscoder
//
//                DO NOT EDIT ANYTHING BELLOW UNLESS
//                   YOU KNOW WHAT YOURE DOING

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const eco = require('../../Database/EcoDB');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('history')
        .setDescription('Check your purchase history'),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const embed = new EmbedBuilder();
        const { guild, member } = interaction;

        const history = eco.history.fetch(member.id, guild.id);

	    if (!history.length) {
		    return interaction.reply({
        		 content: 'You have nothing in your history... Buy something...',
           		 ephemeral: true
       		 });
	    }

        embed
            .setTitle(`**${member.user.displayName}'s Purchase History...**`)
            .setDescription(history
                .map(
                    item => `**x${item.quantity} ${item.name}** - ` +
                    `**${item.price}** coins (**${item.date}**)`
                )
                .join('\n'))
            .setColor('Random');
        interaction.reply({ embeds: [embed] });
    }
};
