const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const filesContent = require("../../template/files_content.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createpv")
    .setDescription("It creates the PV file")
    .addStringOption((option) => {
      return option
        .setName("pv_name")
        .setDescription("Enter pv name")
        .setRequired(true);
    }),
  async execute(client, interaction, args) {
    const pv_name = interaction.options.getString("pv_name");
    filesContent[pv_name] = {};
    const embed1 = new discord.MessageEmbed()
      .setDescription(`You entered the file name: **${pv_name}**`)
      .setColor("GREEN");

    await interaction.reply({
      embeds: [embed1],
    });
  },
};
