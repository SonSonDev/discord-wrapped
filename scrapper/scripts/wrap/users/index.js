const { sort, getTop } = require("../../utils");
const fillChannels = require("./channels");
const fillEmojis = require("./emojis");
const fillMentions = require("./mentions");
const fillWords = require("./words");
const { fillDays, fillHours, fillMonths, fillDates } = require("./time");

const wrapUsers = (messages) => {
  let users = messages.reduce((acc, cur) => {
    let index = acc.findIndex(u => u.username === cur.author);
    if (index === -1) {
      acc.push({
        username: cur.author,
        avatar: cur.avatar,
        count: 0,
        words: [],
        channels: [],
        emojis: [],
        mentions: [],
        //links: 0,
        hours: [],
        days: [],
        months: [],
        dates: [],
      });
      index = acc.length - 1;
    }

    acc[index].count += 1;
    acc[index].words = fillWords(acc[index].words, cur);
    acc[index].channels = fillChannels(acc[index].channels, cur);
    acc[index].emojis = fillEmojis(acc[index].emojis, cur);
    acc[index].mentions = fillMentions(acc[index].mentions, cur);
    acc[index].hours = fillHours(acc[index].hours, cur);
    acc[index].days = fillDays(acc[index].days, cur);
    acc[index].months = fillMonths(acc[index].months, cur);
    acc[index].dates = fillDates(acc[index].dates, cur);
    return acc;
  }, []);

  users.map(u => {
    u.words = getTop(sort(u.words, "count"), 10);
    u.channels = getTop(sort(u.channels, "count"), 10);
    u.emojis = getTop(sort(u.emojis, "count"), 10);
    u.mentions = getTop(sort(u.mentions, "count"), 10);
    u.hours = sort(u.hours, "hour", -1);
    u.days = sort(u.days, "day", -1);
    u.months = sort(u.months, "month", -1);
    u.dates = sort(u.dates, "date", -1);
    return u;
  });

  users = sort(users, "count");

  return users;
};

module.exports = wrapUsers;
