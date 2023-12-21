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
        .setName('shop-buy')
        .setDescription('Buy an item from the shop')
        .addStringOption(option =>
            option
                .setName('item-name')
                .setDescription('What item are you buying?')
                .setRequired(true)
        ),

    /**
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, member } = interaction;

        const item1 = interaction.options.getString('item-name');
        const item2 = eco.shop.finditem(item1, guild.id);

	    if (!item2) {
		    return interaction.reply({
			    content: `Could not find item name or ID: ${item1}`,
			    ephemeral: true
		    });
	    }

        const userBalance = eco.balance.fetch(member.id, guild.id);

        if (item2.price > userBalance) {
            return interaction.reply({
                content: 'You are not able to afford this',
                ephemeral: true
            });
        }

	    if (member.roles.cache.has(item2.role)) {
		    return interaction.reply({
			    content: 'You cannot buy this item, you already have the role that comes with it'
		    });
	    }

        const purchase = eco.shop.buy(item1, member.id, guild.id);

	    if (purchase.quantity === 'max') {
		    return interaction.reply({
			    content: 'You already have the max amount of this item',
			    ephemeral: true
		    });
	    }

        if (item2.role) guild.members.cache.get(member.id).roles.add(guild.roles.cache.get(item2.role));

        interaction.reply({
            content: `You have purchased the following item: ${item2.name} for ${item2.price} coins!`,
            ephemeral: true
        });
    }
};
