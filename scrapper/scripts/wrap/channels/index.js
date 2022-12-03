const { sort, getTop } = require("../../utils");
const fillEmojis = require("./emojis");
const fillUsers = require("./users");

const wrapChannels = (messages) => {
  let channels = messages.reduce((acc, cur) => {
    let index = acc.findIndex(c => c.name === cur.channel);
    if (index === -1) {
      acc.push({
        name: cur.channel,
        count: 0,
        users: [],
        emojis: [],
      });
      index = acc.length - 1;
    }

    acc[index].count += 1;
    acc[index].users = fillUsers(acc[index].users, cur);
    acc[index].emojis = fillEmojis(acc[index].emojis, cur);
    return acc;
  }, []);

  channels.map(c => {
    c.users = getTop(sort(c.users, "count"), 5);
    c.emojis = getTop(sort(c.emojis, "count"), 5);
    return c;
  });

  channels = sort(channels, "count");
  return channels;
};

module.exports = wrapChannels;
