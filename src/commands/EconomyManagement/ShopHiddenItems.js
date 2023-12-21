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
        .setName('shop-hidden-items')
        .setDescription('See what is hid in the shop')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
         *
         * @param {ChatInputCommandInteraction} interaction
         * @param {Client} client
         */
    async execute(interaction, client) {
        const embed = new EmbedBuilder();
        const { guild, member } = interaction;

        const HiddenItems = eco.shop.filter(item => item.custom.hidden);

        if (!HiddenItems.length) return interaction.reply({
            content: 'There is nothing hidden in the shop',
            ephemeral: true
        });

        embed
            .setTitle(`**${guild.name}'s Hidden Shop Items... (${HiddenItems.length} hidden items)**`)
            .setDescription(`${hiddenShop
                .map((item, index) =>
                    `${index + 1} - ${item.custom.hidden ? ' 🔒 | ' : ' '}${item.custom.emoji} ` +
                        `**${item.name}** (ID: **${item.id}**) - **${item.price}** coins ` +
                        `(Since **${new Date(item.custom.hiddenSince).toLocaleString()}**)`
                )
                .join('\n')}`);

        interaction.reply({ embeds: [embed], ephemeral: true });

    }
};
