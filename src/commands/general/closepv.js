const discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { uploadFile, read_files, write_files, generateUrl } = require('../../../utils.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('closepv')
        .setDescription('It creates the PV file')
        .addStringOption(option => {
            return option.setName('file_name')
                .setDescription('Enter pv file name')
                .setRequired(true);
        }),
    async execute(client, interaction, args) {

        const file_name = interaction.options.getString('file_name');
        if (file_name === undefined) { await interaction.reply("Please enter a valide file name !"); return; }
        await interaction.deferReply();
        await interaction.editReply({
            embeds: [new discord.MessageEmbed()
                .setDescription('Uploading file to drive ...')
                .setColor('RANDOM')
            ]
        });
        let file = await uploadFile(file_name);

        let files = read_files();
        files[file.name] = file.id;
        console.log(files);
        write_files(files);
        let link = await generateUrl(file.id);
        const embed1 = new discord.MessageEmbed()
            .setDescription(`The PV **${file_name}** has been successfully uploaded to drive`)
            .setAuthor({ name: 'AutoPV', iconURL: 'https://i.ibb.co/rmGcG0Y/GDG-2-removebg-preview.jpg' })
            .setTitle(`${file.name}`)
            .setURL(`${link.webContentLink}`)
            .setColor('GREEN');

        await interaction.editReply({
            embeds: [embed1]
        });
    },
};