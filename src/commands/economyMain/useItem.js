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
        .setName('use-item')
        .setDescription('Use an item from your inventory')
        .addStringOption(option =>
            option
                .setName('item-name')
                .setDescription('What item are you using?')
                .setRequired(true)
        ),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const embed = new EmbedBuilder();
        const { guild, member } = interaction;

        const inv = eco.inventory.fetch(member.id, guild.id);

        if (!inv.length) {
            return interaction.reply({
            		content: 'You have nothing in your inventory... Buy something...',
            		ephemeral: true
		    });
	    }

        const item = interaction.options.getString('item-name');
        const itemToUse = eco.inventory.findItem(item, member.id, guild.id);

        if (!itemToUse) {
            return interaction.reply({
            		content: `You cannot find an item called ${item} in your inventory`,
            		ephemeral: true
            });
        }

        itemToUse.use(item, member.id, guild.id);

        embed
            .setTitle(`**${member.user.displayName}'s Used ${item}**`)
            .setDescription(itemToUse.message)
            .setColor('Random');
        interaction.reply({ embeds: [embed] });
    }
};
