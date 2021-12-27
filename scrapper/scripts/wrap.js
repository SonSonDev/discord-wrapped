const fs = require("fs");
const moment = require("moment");
const { sort, getTop } = require("./utils");
const wrapAwards = require("./wrap/awards");
const wrapChannels = require("./wrap/channels");
const wrapUsers = require("./wrap/users");

const discServIndex = process.argv[2];

const guildListText = fs.readFileSync(`${__dirname}/../scrap/guilds.json`);
const guildList = JSON.parse(guildListText);
const guild = guildList[discServIndex];
const guildFilename = guild.name.replace(/\s/g, "");

const channels = JSON.parse(fs.readFileSync(`${__dirname}/../scrap/${guildFilename}-guild-channels.json`));
const allMessages = JSON.parse(fs.readFileSync(`${__dirname}/../scrap/${guildFilename}-guild-messages.json`));

const messages = allMessages
  .filter(m => !m.author.bot)
  .filter(m => moment(m.timestamp).year() === 2021)
  .map(m => {
    return {
      timestamp: m.timestamp,
      channel: channels.find(c => c.id === m.channel_id).name,
      date: moment(m.timestamp).format("YYYY-MM-DD HH:mm"),
      author: m.author.username,
      avatar: m.author.avatar ? `https://cdn.discordapp.com/avatars/${m.author.id}/${m.author.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/0.png",
      mentions: m.mentions.map(m => ({
        username: m.username,
        avatar: m.avatar ? `https://cdn.discordapp.com/avatars/${m.id}/${m.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/0.png",
      })),
      content: m.content,
    };
  });

const output = {};

output.guild = {
  id: guild.id,
  name: guild.name,
  icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
};

output.users = wrapUsers(messages);
output.channels = wrapChannels(messages);
output.awards = wrapAwards(messages);

fs.writeFileSync(`${__dirname}/../output/${guildFilename}-wrapped.json`, JSON.stringify(output));
