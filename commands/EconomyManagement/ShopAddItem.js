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
        .setName('shop-add-item')
        .setDescription('Add an item to the shop')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option
            .setName('item-name')
            .setDescription('The name of the item you are adding')
            .setRequired(true)
        )
        .addNumberOption(option =>
            option
            .setName('price')
            .setDescription('How much is this item going to cost')
            .setRequired(true)
        )
        .addStringOption(option =>
            option
            .setName('description')
            .setDescription('What is this item?')
            .setRequired(true)
        )
        .addNumberOption(option =>
            option
            .setName('limit')
            .setDescription('How many of this item can one person have')
            .setRequired(false)
        )
        .addStringOption(option =>
            option
            .setName('message')
            .setDescription('The message that is stated when someone uses the item')
            .setRequired(false)
        )
        .addRoleOption(option =>
            option
            .setName('role')
            .setDescription('What role do you want added to them?')
            .setRequired(false)
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        const { guild, member } = interaction;

        const item = interaction.options.getString('item-name');
        const price = interaction.options.getNumber('price');
        const description = interaction.options.getString('description');
        const limit = interaction.options.getNumber('limit');
        const message = interaction.options.getString('message');
        const role = interaction.options.getRole('role');

        if (!message) {
            if (!role) {
                if (!limit) {
                    eco.shop.addItem(guild.id, {
                        name: item,
                        price: price,
                        description: description,
                    })

                    return interaction.reply({
                        content: 'Item was added to the shop successfully',
                        ephemeral: true
                    })
                }
                eco.shop.addItem(guild.id, {
                    name: item,
                    price: price,
                    description: description,
                    maxAmount: limit
                })

                return interaction.reply({
                    content: 'Item was added to the shop successfully',
                    ephemeral: true
                })
            }

            if (!limit) {
                eco.shop.addItem(guild.id, {
                    name: item,
                    price: price,
                    description: description,
                })

                return interaction.reply({
                    content: 'Item was added to the shop successfully',
                    ephemeral: true
                })
            }

            eco.shop.addItem(guild.id, {
                name: item,
                price: price,
                description: description,
                maxAmount: limit,
                role: role
            })

            return interaction.reply({
                content: 'Item was added to the shop successfully',
                ephemeral: true
            })
        }

        if (!role) {
            if (!message) {
                if (!limit) {
                    eco.shop.addItem(guild.id, {
                        name: item,
                        price: price,
                        description: description,
                    })

                    return interaction.reply({
                        content: 'Item was added to the shop successfully',
                        ephemeral: true
                    })
                }

                eco.shop.addItem(guild.id, {
                    name: item,
                    price: price,
                    description: description,
                    maxAmount: limit
                })

                return interaction.reply({
                    content: 'Item was added to the shop successfully',
                    ephemeral: true
                })
            }

            eco.shop.addItem(guild.id, {
                name: item,
                price: price,
                description: description,
                maxAmount: limit,
                message: message
            })

            return interaction.reply({
                content: 'Item was added to the shop successfully',
                ephemeral: true
            })
        }

        if (!limit) {
            if (!role) {
                if (!message) {
                    eco.shop.addItem(guild.id, {
                        name: item,
                        price: price,
                        description: description,
                    })

                    return interaction.reply({
                        content: 'Item was added to the shop successfully',
                        ephemeral: true
                    })
                }

                eco.shop.addItem(guild.id, {
                    name: item,
                    price: price,
                    description: description,
                    message: message
                })

                return interaction.reply({
                    content: 'Item was added to the shop successfully',
                    ephemeral: true
                })
            }

            eco.shop.addItem(guild.id, {
                name: item,
                price: price,
                description: description,
                role: role
            })

            return interaction.reply({
                content: 'Item was added to the shop successfully',
                ephemeral: true
            })
        }

        eco.shop.addItem(guild.id, {
            name: item,
            price: price,
            description: description,
            maxAmount: limit,
            message: message,
            role: role,
        })

        interaction.reply({
            content: 'Item was added to the shop successfully',
            ephemeral: true
        })
    }
}