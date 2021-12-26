const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const base_url = "https://discord.com/api/v8",
  bot_token = process.env.BOT_TOKEN;

const getGuildListUrl = "/users/@me/guilds";

const instance = axios.create({
  baseURL: base_url,
  timeout: 4000,
  headers: { "Authorization": `Bot ${bot_token}` },
});

const getGuildList = async () => {
  const data = (await instance.get(getGuildListUrl)).data;
  fs.writeFileSync(`${__dirname}/../scrap/guilds.json`, JSON.stringify(data));
};

(async () => {
  try {
    await getGuildList();
  } catch (e) {
    fs.writeFileSync(`${__dirname}/../scrap/error.json`, JSON.stringify(e));
  }
})();
