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
        .setName('work')
        .setDescription('work to earn some coins'),

    /**
      * @param {ChatInputCommandInteraction} interaction
      */
    async execute(interaction) {
        const { guild, member } = interaction;

        const workResult = eco.rewards.getwork(member.id, guild.id);

        if (!workResult.claimed) {
            const cooldownTime = workResult.cooldown.time;

            const CDString = `${cooldownTime.days ? `**${cooldownTime.days}** days, ` : ''}` +

            `${cooldownTime.days || cooldownTime.hours ?
                `**${cooldownTime.hours}** hours, `
                : ''}` +

            `${cooldownTime.hours || cooldownTime.minutes ?
                `**${cooldownTime.minutes}** minutes, ` :
                ''}` +
            `**${cooldownTime.seconds}** seconds`;

            return interaction.reply({
                content: `You have already worked! You can next work in: ${CDString}`,
                ephemeral: true
            });
        }

        interaction.reply({
            content: `${member}, You have worked really hard and earned; **${workResult.reward} coins!**`
        });

    }
};
