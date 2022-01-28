const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const fileContent = require("src\template\file_content.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addcontenttopv")
    .setDescription(" Add content to the PV ")
    .addStringOption((option) =>
      option.setName("pvname").setDescription("add pv name ").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("add your content")
        .setRequired(true)
    ),

  async execute(client, interaction, args) {
    const content = interaction.options.getString("content");

    fileContent.content = content;

    const embed1 = new discord.MessageEmbed()
      .setDescription("content added succesfully")
      .setColor("GREEN");

    await interaction.reply({
      embeds: [embed1],
    });
  },
};
