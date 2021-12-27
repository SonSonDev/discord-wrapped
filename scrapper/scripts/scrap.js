const fs = require("fs");
const axios = require("axios");
const moment = require("moment");
const _ = require("lodash");
const { timeout } = require("../utils");
require("dotenv").config();


const discServIndex = process.argv[2];

const base_url = "https://discord.com/api/v8",
  bot_token = process.env.BOT_TOKEN;

const getGuildUrl = (guild_id) => `/guilds/${guild_id}`,
  getGuildChannelListUrl = (guild_id) => `/guilds/${guild_id}/channels`,
  getChannelMessageUrl = (channel_id) => `/channels/${channel_id}/messages`;

const instance = axios.create({
  baseURL: base_url,
  timeout: 20000,
  headers: { "Authorization": `Bot ${bot_token}` },
});

const guildListText = fs.readFileSync(`${__dirname}/../scrap/guilds.json`);
const guildList = JSON.parse(guildListText);
const guildId = guildList[discServIndex].id;
const guildFilename = guildList[discServIndex].name.replace(/\s/g, "");

const getGuildInfo = async (id) => {
  const data = (await instance.get(getGuildUrl(id))).data;
  fs.writeFileSync(`${__dirname}/../scrap/${guildFilename}-guild-info.json`, JSON.stringify(data));
};

const getGuildChannelList = async (id) => {
  const data = (await instance.get(getGuildChannelListUrl(id))).data;
  fs.writeFileSync(`${__dirname}/../scrap/${guildFilename}-guild-channels.json`, JSON.stringify(data));
  return data;
};

const getGuildMessages = async (channels) => {
  let data = [];
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
        .catch((e) => {
          stop = true;
          console.log(e);
          return e;
        });
      const messages = response.data || [];
      if (!messages.length || moment(_.last(messages).timestamp).year() !== 2021) {
        console.log(!messages.length || _.last(messages).timestamp);
        stop = true;
      } else {
        channelMessages = channelMessages.concat(messages);
        params.before = _.last(messages).id;
      }
    }

    data = data.concat(channelMessages);
  }
  let text = JSON.stringify(data);
  fs.writeFileSync(`${__dirname}/../scrap/${guildFilename}-guild-messages.json`, text);
  return data;
};

(async () => {
  try {
    await getGuildInfo(guildId);
    const channels = await getGuildChannelList(guildId);
    await getGuildMessages(channels);
  } catch (e) {
    console.log("error", e);
    fs.writeFileSync(`${__dirname}/../scrap/error.json`, JSON.stringify(e));
  }
})();
