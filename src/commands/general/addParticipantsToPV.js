const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fileContent = require("src\template\file_content.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add_participants_topv")
    .setDescription("Add participants to the PV"),
  async execute(client, interaction, args) {
    const voiceChanelMembers =
      interaction.member.voice.channel?.members?.values();
    const membersUsernames = [];
    if (!voiceChanelMembers) {
      return await interaction.reply("no one is in the voice channel!");
    }
    for (let member of voiceChanelMembers) {
      membersUsernames.push(member.user.username);
    }
    const participants = membersUsernames.join("\n");
    fileContent.participants = participants;
    const embed1 = new discord.MessageEmbed()
      .setDescription("Participants added successfully ")
      .setColor("GREEN");

    await interaction.reply({
      embeds: [embed1],
    });
  },
};
