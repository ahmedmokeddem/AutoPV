const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const fileContent = require("../../template/files_content.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add_whats_next")
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
    const pvName = interaction.options.getString("pvname");
    if (!fileContent[pvName])
      return await interaction.reply("pv name doesn't exist!");
    fileContent[pvName].whats_next = points;

    const embed1 = new discord.MessageEmbed()
      .setDescription("what's next added succesfully")
      .setColor("GREEN");

    await interaction.reply({
      embeds: [embed1],
    });
  },
};
