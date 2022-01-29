const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const fileContent = require("../../template/files_content.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("addcontenttopv")
        .setDescription(" Add content to the PV ")
        .addStringOption((option) =>
            option
            .setName("pvname")
            .setDescription(" the name of the pv to add the content to ")
            .setRequired(true)
        )
        .addStringOption((option) =>
            option
            .setName("content")
            .setDescription("add your content")
            .setRequired(true)
        ),

    async execute(client, interaction, args) {
        const content = interaction.options.getString("content");
        const pvName = interaction.options.getString("pvname");
        //if the file name doesn't exist
        if (!fileContent[pvName])
            return await interaction.reply("pv name doesn't exist!");
        //set the constent prop
        fileContent[pvName].content = content;

        //reply
        const embed1 = new discord.MessageEmbed()
            .setDescription("The content has been successfully added to the PV " + fileContent[pvName].title)
            .setColor("GREEN");

        await interaction.reply({
            embeds: [embed1],
        });
    },
};