const discord = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add_participants_topv")
    .setDescription("description"),
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
    await interaction.reply(participants);
  },
};
