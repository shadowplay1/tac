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
        .setName('shop-list')
        .setDescription('List all the items in the shop'),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const embed = new EmbedBuilder();
        const { guild } = interaction;

        const shopList = eco.shop.all(guild.id);

	    const shop = shopList.map(item => {
		    const shopItemString =
			    `ID: **${item.id}** = **${item.name}** (**${item.price}** coins)\n` +
			    `Description: ${item.description}\nMax Per Person: ${item.maxAmount || 'Infinity'}\n` +
			    `Role: ${item.role || 'No role with this item'}`;

		    return shopItemString;
	    });

	    if (!shopList.length) {
		    return interaction.reply({
			    content: 'There is nothing in the shop',
			    ephemeral: true
		    });
	    }

        embed
            .setTitle(`**${guild.name}'a Shop...**`)
            .setTimestamp()
            .setColor('Random')
            .setDescription(shop.join('\n'));

        interaction.reply({ embeds: [embed] });
    }
};
