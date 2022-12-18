const fs = require("fs");
const axios = require("axios");
const prompts = require("prompts");
const moment = require("moment");
const _ = require("lodash");
const { timeout } = require("./utils");
require("dotenv").config();

let filename = "";

const base_url = "https://discord.com/api/v8",
  bot_token = process.env.BOT_TOKEN;

const getGuildListUrl = "/users/@me/guilds",
  getGuildUrl = (guild_id) => `/guilds/${guild_id}`,
  getGuildChannelListUrl = (guild_id) => `/guilds/${guild_id}/channels`,
  getChannelMessageUrl = (channel_id) => `/channels/${channel_id}/messages`;

const instance = axios.create({
  baseURL: base_url,
  timeout: 20000,
  headers: { "Authorization": `Bot ${bot_token}` },
});

const getGuildList = async () => {
  const data = (await instance.get(getGuildListUrl)).data;
  return data;
};

const getGuildInfo = async (id) => {
  const data = (await instance.get(getGuildUrl(id))).data;
  fs.writeFileSync(`${__dirname}/../scrap/${filename}-guild-info.json`, JSON.stringify(data));
  return data;
};

const getGuildChannelList = async (id) => {
  const data = (await instance.get(getGuildChannelListUrl(id))).data;
  fs.writeFileSync(`${__dirname}/../scrap/${filename}-guild-channels.json`, JSON.stringify(data));
  return data;
};

const getGuildMessages = async (channels, year) => {
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
        .catch(e => {
          stop = true;
          console.log(e);
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
    fs.writeFileSync(`${__dirname}/../scrap/${filename}-guild-messages-${y}.json`, text);
  }
  return data;
};

(async () => {
  try {
    const guildList = await getGuildList();
    console.log(guildList.reduce((acc, cur, index) => acc += `${index}: ${cur.name}${index < guildList.length - 1 ? "\n" : "" }`, ""));
    const { value: guildIndex } = await prompts({
      type: "number",
      name: "value",
      message: "What list?",
      validate: value => value >= 0 && value < guildList.length ? true : "NAY!",
    });
    const guildId = filename = guildList[guildIndex].id;
    await getGuildInfo(guildId);
    const channels = await getGuildChannelList(guildId);
    const { value: year } = await prompts({
      type: "number",
      name: "value",
      message: "What year?",
      validate: year => year <= moment().year() && year > 2012 ? true : "NAY!",
    });
    await getGuildMessages(channels, year);
  } catch (e) {
    console.log("error", e);
    fs.writeFileSync(`${__dirname}/../scrap/error.json`, JSON.stringify(e));
  }
})();
