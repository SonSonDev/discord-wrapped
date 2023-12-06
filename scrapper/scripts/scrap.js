import fs from "fs";
import axios from "axios";
import moment from "moment";
import inquirer from "inquirer";
import _ from "lodash";
import { timeout } from "./utils/index.js";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
const __dirname = path.resolve();

const base_url = "https://discord.com/api/v8",
  bot_token = process.env.BOT_TOKEN,
  user_token = process.env.USER_TOKEN;

const getGuildsListUrl = "/users/@me/guilds",
  getGuildUrl = (guildId) => `/guilds/${guildId}`,
  getGuildChannelsListUrl = (guildId) => `/guilds/${guildId}/channels`,
  getChannelMessageUrl = (channelId) => `/channels/${channelId}/messages`,
  outputDirectory = (guildId) => `${__dirname}/scrapper/output/${guildId}`;

const instance = axios.create({
  baseURL: base_url,
  timeout: 20000,
  headers: { "Authorization": process.argv[2] === "--user" ? user_token : `Bot ${bot_token}` },
});

/** Create scrapping output directory */
const createOutputDirectory = (guildId) => {
  if (!fs.existsSync(outputDirectory(guildId))){
    fs.mkdirSync(outputDirectory(guildId));
  }
};

/** Get Discord bot guilds list */
const getGuildsList = async () => {
  const data = (await instance.get(getGuildsListUrl)).data;
  fs.writeFileSync(`${__dirname}/scrapper/output/guilds.json`, JSON.stringify(data));
  return data;
};

/** Get guild informations */
const getGuildInfo = async (id) => {
  const data = (await instance.get(getGuildUrl(id))).data;
  fs.writeFileSync(`${outputDirectory(id)}/guild-info.json`, JSON.stringify(data));
  return data;
};

/** Get guild channels list */
const getGuildChannelsList = async (id) => {
  const data = (await instance.get(getGuildChannelsListUrl(id))).data;
  fs.writeFileSync(`${outputDirectory(id)}/guild-channels.json`, JSON.stringify(data));
  return data;
};

/**
* GET GUILD MESSAGES
* id: String
* channels: Array
* year: Int
*/
const getGuildMessages = async (guildId, year) => {
  let data = [];
  const channels = await getGuildChannelsList(guildId);
  for (const { id, name } of channels) {
    console.log(name);
    let channelMessages = [];
    let stop = false;
    const params = {
      limit: 100,
    };
    while (!stop) {
      await timeout(800);
      const response = await instance.get(getChannelMessageUrl(id), { params })
        .catch(e => {
          stop = true;
          console.log("error", e?.response?.status, e?.response?.statusText, e?.response?.data?.message);
          return e;
        });
      const messages = response.data || [];
      if (!messages.length || moment(_.last(messages).timestamp).year() < year) {
        channelMessages = channelMessages.concat(messages.filter(m => moment(m.timestamp).year() >= year));
        stop = true;
      } else {
        channelMessages = channelMessages.concat(messages);
        params.before = _.last(messages).id;
      }
    }
    console.log(` ->${channelMessages.length} messages`);
    data = data.concat(channelMessages);
  }
  console.log("--------");
  for (let y = year; y <= moment().year(); y++) {
    const fileData = data.filter(m => moment(m.timestamp).year() === y);
    console.log(`-> ${y}:${fileData.length}`);
    let text = JSON.stringify(fileData);
    fs.writeFileSync(`${outputDirectory(guildId)}/guild-messages-${y}.json`, text);
  }
  return data;
};

/** EXECUTE */
(async () => {
  try {
    const guildList = await getGuildsList();
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

    createOutputDirectory(guildId);
    await getGuildInfo(guildId);
    await getGuildMessages(guildId, year);
  } catch (e) {
    console.log("error", e);
    fs.writeFileSync(`${__dirname}/../scrap/error.json`, JSON.stringify(e));
  }
})();
