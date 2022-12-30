import fs from "fs";
import moment from "moment";
import inquirer from "inquirer";
import wrapRankings from "./wrap/rankings/index.js";
import wrapChannels from "./wrap/channels/index.js";
import wrapUsers from "./wrap/users/index.js";
import wrapMonths from "./wrap/months/index.js";

import path from "path";
const __dirname = path.resolve();

const guildListText = fs.readFileSync(`${__dirname}/scrapper/output/guilds.json`);
const contentDirectory = guildId => `${__dirname}/scrapper/output/${guildId}`;
const outputDirectory = `${__dirname}/scrapper/output/wrap`;

(async () => {
  const guildList = JSON.parse(guildListText);
  const { guildId, year } = await inquirer
    .prompt([
      {
        name: "guildId", type: "list", message: "What guild?",
        choices: guildList.map(g => ({
          value: g.id,
          name: g.name,
        })),
      },
      {
        name: "year", type: "number", message: "What year?",
        validate: function (input) {
          const year = Number(input);
          const done = this.async();
          if (!Number.isInteger(year) || year > moment().year() || year < 2012) {
            done("Give valid year");
            return false;
          }
          done(null, true);
        },
      },
    ]);

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
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

  const guild = guildList.find(g => g.id === guildId);
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
  fs.writeFileSync(`${outputDirectory}/${guild.id}-wrapped-${year}.json`, JSON.stringify(output));
})();
