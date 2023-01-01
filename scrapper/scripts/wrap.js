import fs from "fs";
import moment from "moment";
import inquirer from "inquirer";
import wrapRankings from "./wrap/rankings/index.js";
import wrapChannels from "./wrap/channels/index.js";
import wrapUsers from "./wrap/users/index.js";
import wrapMonths from "./wrap/months/index.js";

import path from "path";
const __dirname = path.resolve();

const guildsData = JSON.parse(fs.readFileSync(`${__dirname}/scrapper/output/guilds.json`).toString());
const contentDirectory = guildId => `${__dirname}/scrapper/output/${guildId}`;
const outputDirectory = `${__dirname}/scrapper/output`;

const getAvailableGuilds = () => {
  const files = fs.readdirSync(outputDirectory);
  return guildsData.filter(g => files.includes(g.id));
};

const getAvailableYears = (id) => {
  const regex = /guild-messages-([0-9]+)\.json/;
  return fs.readdirSync(`${outputDirectory}/${id}`)
    .filter(f => f.match(regex))
    .map(f => parseInt(f.match(regex)[1]));
};

(async () => {
  const { guildId } = await inquirer
    .prompt([
      {
        name: "guildId", type: "list", message: "What guild?",
        choices: getAvailableGuilds().map(g => ({
          value: g.id,
          name: g.name,
        })),
      },
    ]);
  const { year } = await inquirer
    .prompt([
      {
        name: "year", type: "list", message: "What year?",
        choices: getAvailableYears(guildId).map(v => ({
          value: v,
          name: v.toString(),
        })),
      },
    ]);

  if (!fs.existsSync(outputDirectory + "/wrap")) {
    fs.mkdirSync(outputDirectory + "/wrap");
  }
  const channels = JSON.parse(fs.readFileSync(`${contentDirectory(guildId)}/guild-channels.json`));
  const allMessages = JSON.parse(fs.readFileSync(`${contentDirectory(guildId)}/guild-messages-${year}.json`));

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

  const guild = guildsData.find(g => g.id === guildId);
  output.guild = {
    id: guild,
    name: guild.name,
    icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
  };

  output.year = year;
  output.users = wrapUsers(messages);
  output.channels = wrapChannels(messages);
  output.rankings = wrapRankings(messages);
  output.months = wrapMonths(messages);

  fs.writeFileSync(`${__dirname}/common/content.json`, JSON.stringify(output));
  fs.writeFileSync(`${outputDirectory}/wrap/${guild.id}-wrapped-${year}.json`, JSON.stringify(output));
})();
