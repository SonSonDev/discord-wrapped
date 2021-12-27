const fillEmojis = require("./emojis");
const fillUsers = require("./users");

// SORT
function sort (array, type) {
  return array.sort((a, b) => b[type] - a[type]).slice(0, 10);
}

const wrapChannels = (messages) => {
  return messages.reduce((acc, cur) => {
    let index = acc.findIndex(c => c.name === cur.channel);
    if (index === -1) {
      acc.push({
        name: cur.channel,
        users: [],
        emojis: [],
      });
      index = acc.length - 1;
    }

    acc[index].users = sort(fillUsers(acc[index].users, cur), "count");
    acc[index].emojis = sort(fillEmojis(acc[index].emojis, cur), "count");
    return acc;
  }, []);
};

module.exports = wrapChannels;
