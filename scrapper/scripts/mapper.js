const fs = require("fs");
const moment = require("moment");

const discServIndex = process.argv[2];

const guildListText = fs.readFileSync(`${__dirname}/../scrap/guilds.json`);
const guildList = JSON.parse(guildListText);
const guildFilename = guildList[discServIndex].name.replace(/\s/g, "");

const channels = JSON.parse(fs.readFileSync(`${__dirname}/../scrap/${guildFilename}-guild-channels.json`));
const messages = JSON.parse(fs.readFileSync(`${__dirname}/../scrap/${guildFilename}-guild-messages.json`));

const output = messages
  .filter(m => !m.author.bot)
  .filter(m => moment(m.timestamp).year() === 2021)
  .map(m => {
    return {
      timestamp: m.timestamp,
      channel: channels.find(c => c.id === m.channel_id).name,
      date: moment(m.timestamp).format("YYYY-MM-DD HH:mm"),
      author: m.author.username,
      avatar: m.author.avatar ? `https://cdn.discordapp.com/avatars/${m.author.id}/${m.author.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/0.png",
      content: m.content,
    };
  });

fs.writeFileSync(`${__dirname}/../output/${guildFilename}-output.json`, JSON.stringify(output));
