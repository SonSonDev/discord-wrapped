const fs = require("fs");
const axios = require("axios");
require("dotenv").config();

const scrapDirectory = "./scrap";

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
  fs.writeFileSync(`${scrapDirectory}/guilds.json`, JSON.stringify(data));
};

(async () => {
  try {
    await getGuildList();
  } catch (e) {
    fs.writeFileSync("export/error.json", JSON.stringify(e));
  }
})();
