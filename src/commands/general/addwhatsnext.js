const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const fileContent = require("src\template\file_content.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addWhatsNext")
    .setDescription(" Add points to be discussed next meeting  ")
    .addStringOption((option) =>
      option.setName("pvname").setDescription("add pv name ").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("points")
        .setDescription("add whats next ")
        .setRequired(true)
    ),

  async execute(client, interaction, args) {
    const points = interaction.options.getString("points");

    fileContent.content = points;

    const embed1 = new discord.MessageEmbed()
      .setDescription("content added succesfully")
      .setColor("GREEN");

    await interaction.reply({
      embeds: [embed1],
    });
  },
};