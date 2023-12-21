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
            .setName('work')
            .setDescription('Work to earn some coins'),
        /**
         * 
         * @param {ChatInputCommandInteraction} interaction 
         * @param {Client} client 
         */
        async execute(interaction, client) {
            const embed = new EmbedBuilder()
            const { guild, member } = interaction;

            const WorkResult = eco.rewards.getWork(member.id, guild.id)

            if (!WorkResult.claimed) {
                const cooldownTime = WorkResult.cooldown.time

                const CDString = `${cooldownTime.days ? `**${cooldownTime.days}** days, ` : ''}` +

            `${cooldownTime.days || cooldownTime.hours ?
                `**${cooldownTime.hours}** hours, `
                : ''}` +

            `${cooldownTime.hours || cooldownTime.minutes ?
                `**${cooldownTime.minutes}** minutes, ` :
                ''}` +
            `**${cooldownTime.seconds}** seconds`

            return interaction.reply({
                content: `You have already worked! You can next work in: ${CDString}`,
                ephemeral: true
            })
        }

        interaction.reply({
            content: `${member}, You have worked really hard and earned; **${WorkResult.reward} coins!**`
        })

    }
}