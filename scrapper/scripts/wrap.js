const fs = require("fs");
const moment = require("moment");
const { getWords } = require("../utils");

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
      content: m.content,
    };
  });

const output = {};

// GET WORDS STATS
function fillWords (wordsArray, message) {
  const words = getWords(message.content)
    .filter(e => !e.match(/<.+>/));

  words.forEach(word => {
    let index = wordsArray.findIndex(w => w.text === word);
    console.log(index);
    if (index === -1) {
      wordsArray.push({
        text: word,
        count: 0,
      });
      index = wordsArray.length - 1;
    }
    wordsArray[index].count += 1;
  });

  return wordsArray;
}

// GET ENOJIS STATS
function fillEmojis (emojisArray, message) {
  const words = getWords(message.content)
    .filter(e => e.match(/<.+:.+>/));

  words.forEach(word => {
    let index = emojisArray.findIndex(w => w.text === word);
    if (index === -1) {

      const m = word.match(/<(a?):.+:([0-9]+)>/);
      emojisArray.push({
        text: word,
        url: `https://cdn.discordapp.com/emojis/${m[2]}.${m[1] ? "gif" : "png"}`,
        count: 0,
      });
      index = emojisArray.length - 1;
    }
    emojisArray[index].count += 1;
  });

  return emojisArray;
}

// GET CHANNELS STATS
function fillChannels (channelsArray, message) {
  let index = channelsArray.findIndex(c => c.name === message.channel);
  if (index === -1) {
    channelsArray.push({
      name: message.channel,
      count: 0,
    });
    index = channelsArray.length - 1;
  }
  channelsArray[index].count += 1;

  return channelsArray;
}

// SORT
function sort (array, type) {
  return array.sort((a, b) => b[type] - a[type]).slice(0, 10);
}

output.guild = {
  id: guild.id,
  name: guild.name,
  icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`,
};

// FILL USERS STATS
output.users = messages.reduce((acc, cur) => {
  let index = acc.findIndex(u => u.name === cur.author);
  if (index === -1) {
    acc.push({
      name: cur.author,
      avatar: cur.avatar,
      words: [],
      channels: [],
      emojis: [],
      links: 0,
      times: [],
      days: [],
    });
    index = acc.length - 1;
  }

  acc[index].words = fillWords(acc[index].words, cur);
  acc[index].channels = fillChannels(acc[index].channels, cur);
  acc[index].emojis = fillEmojis(acc[index].emojis, cur);
  return acc;
}, []);

output.users.map(u => {
  u.words = sort(u.words, "count");
  u.channels = sort(u.channels, "count");
  u.emojis = sort(u.emojis, "count");
});

fs.writeFileSync(`${__dirname}/../output/${guildFilename}-wrapped.json`, JSON.stringify(output));
