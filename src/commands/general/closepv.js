const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fileContent = require("../../template/files_content.js");
const {
    uploadFile,
    read_files,
    write_files,
    generateUrl,
    renderFile,
} = require("../../../utils.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("closepv")
        .setDescription("It creates the PV file")
        .addStringOption((option) => {
            return option
                .setName("file_name")
                .setDescription("Enter pv file name")
                .setRequired(true);
        }),
    async execute(client, interaction, args) {
        const file_name = interaction.options.getString("file_name");

        await interaction.deferReply();
        //if the file name doesn't exist
        if (!fileContent[file_name]) { return await interaction.editReply("pv name doesn't exist!"); }
        //render the pv file
        renderFile(file_name);
        await interaction.editReply({
            embeds: [
                new discord.MessageEmbed()
                .setDescription("Uploading file to drive ...")
                .setColor("RANDOM"),
            ],
        });
        let files = read_files();
        let file;
        if (files[file_name] === undefined) {
            file = await uploadFile(file_name);
            files[file.name] = file.id;
            write_files(files);
        }

        let link = await generateUrl(files[`${file_name}.docx`]);

        const embed1 = new discord.MessageEmbed()
            .setDescription(
                `The PV **${file_name}** has been successfully uploaded to drive`
            )
            .setAuthor({
                name: "AutoPV",
                iconURL: "https://i.ibb.co/rmGcG0Y/GDG-2-removebg-preview.jpg",
            })
            .setTitle(`${file_name}.docx`)
            .setURL(`${link.webViewLink}`)
            .setColor("GREEN");

        await interaction.editReply({
            embeds: [embed1],
        });
    },
};