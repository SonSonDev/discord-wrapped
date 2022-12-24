const fs = require("fs");
const prompts = require("prompts");
const moment = require("moment");
const wrapRankings = require("./wrap/rankings");
const wrapChannels = require("./wrap/channels");
const wrapUsers = require("./wrap/users");
const wrapMonths = require("./wrap/months");

const guildListText = fs.readFileSync(`${__dirname}/../scrap/guilds.json`);

(async () => {
  const guildList = JSON.parse(guildListText);
  console.log(guildList.reduce((acc, cur, index) => acc += `${index}: ${cur.name}${index < guildList.length - 1 ? "\n" : "" }`, ""));

  const { value: guildIndex } = await prompts({
    type: "number",
    name: "value",
    message: "What list?",
    validate: value => value >= 0 && value < guildList.length ? true : "NAY!",
  });
  const { value: year } = await prompts({
    type: "number",
    name: "value",
    message: "What year?",
    validate: year => year <= moment().year() && year > 2012 ? true : "NAY!",
  });
  const guild = guildList[guildIndex];

  const channels = JSON.parse(fs.readFileSync(`${__dirname}/../scrap/${guild.id}-guild-channels.json`));
  const allMessages = JSON.parse(fs.readFileSync(`${__dirname}/../scrap/${guild.id}-guild-messages-${year}.json`));

  const messages = allMessages
    .filter(m => !m.author.bot)
    .filter(m => moment(m.timestamp).year() === year)
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
        edited: !!m.edited_timestamp,
        attachments: m.attachments.length,
        content: m.content,
      };
    });

  const output = {};

  output.guild = {
    id: guild.id,
    name: guild.name,
    icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
  };

  output.year = year;
  output.users = wrapUsers(messages);
  output.channels = wrapChannels(messages);
  output.rankings = wrapRankings(messages);
  output.months = wrapMonths(messages);

  fs.writeFileSync(`${__dirname}/../../common/content.json`, JSON.stringify(output));
  fs.writeFileSync(`${__dirname}/../output/${guild.id}-wrapped.json`, JSON.stringify(output));
})();
