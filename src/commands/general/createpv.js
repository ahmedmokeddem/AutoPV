const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('createpv')
        .setDescription('It creates the PV file')
        .addStringOption(option => {
            return option.setName('file_name')
                .setDescription('Enter pv file name')
                .setRequired(true);
        }),
    async execute(client, interaction, args) {
        const file_name = interaction.options.getString('file_name');
        if (file_name === undefined) { return await interaction.reply("Please enter a valide file name !"); }

        const embed1 = new discord.MessageEmbed()
            .setDescription(`You entered the file name: **${file_name}**`)
            .setColor('GREEN');

        await interaction.reply({
            embeds: [embed1],
        });
    },
}