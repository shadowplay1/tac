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

        const itemName = interaction.options.getString('item-name');
        const shopItem = eco.shop.finditem(itemName, guild.id);

	    if (!shopItem) {
		    return interaction.reply({
			    content: `Could not find item name or ID: ${itemName}`,
			    ephemeral: true
		    });
	    }

        const userBalance = eco.balance.fetch(member.id, guild.id);

        if (shopItem.price > userBalance) {
            return interaction.reply({
                content: 'You are not able to afford this',
                ephemeral: true
            });
        }

	    if (member.roles.cache.has(shopItem.role)) {
		    return interaction.reply({
			    content: 'You cannot buy this item, you already have the role that comes with it'
		    });
	    }

        const purchase = eco.shop.buy(itemName, member.id, guild.id);

	    if (purchase.quantity === 'max') {
		    return interaction.reply({
			    content: 'You already have the max amount of this item',
			    ephemeral: true
		    });
	    }

        if (shopItem.role) guild.members.cache.get(member.id).roles.add(guild.roles.cache.get(shopItem.role));

        interaction.reply({
            content: `You have purchased the following item: ${shopItem.name} for ${shopItem.price} coins!`,
            ephemeral: true
        });
    }
};
