const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fileContent = require("../../template/files_content.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add_participants_topv")
    .setDescription("Add participants to the PV")
    .addStringOption((option) =>
      option
        .setName("pvname")
        .setDescription(" the name of the pv to add the participants to ")
        .setRequired(true)
    ),
  async execute(client, interaction, args) {
    const pvName = interaction.options.getString("pvname");
    if (!fileContent[pvName])
      return await interaction.reply("pv name doesn't exist!");
    const voiceChanelMembers =
      interaction.member.voice.channel?.members?.values();
    const participants = [];
    if (!voiceChanelMembers) {
      return await interaction.reply("please join a voice channel first!");
    }
    for (let member of voiceChanelMembers) {
      participants.push(member.user.username);
    }

    fileContent[pvName].participants = participants;
    const embed1 = new discord.MessageEmbed()
      .setDescription("Participants added successfully ")
      .setColor("GREEN");

    await interaction.reply({
      embeds: [embed1],
    });
  },
};
