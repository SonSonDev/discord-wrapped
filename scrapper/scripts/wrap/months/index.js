const { sort, getTop } = require("../../utils");
const moment = require("moment");
const fillUsers = require("../channels/users");
const fillChannels = require("../users/channels");

const wrapMonths = (messages) => {
  let months = messages.reduce((acc, cur) => {
    const month = moment(cur.timestamp).month();

    let index = acc.findIndex(m => m.month === month);
    if (index === -1) {
      acc.push({
        month, name: moment(cur.timestamp).format("MMM"),
        count: 0,
        users: [],
        channels: [],
      });
      index = acc.length - 1;
    }

    acc[index].count += 1;
    acc[index].users = fillUsers(acc[index].users, cur);
    acc[index].channels = fillChannels(acc[index].channels, cur);

    return acc;
  }, []);


  months.map(m => {
    m.users = getTop(sort(m.users, "count"));
    m.channels = getTop(sort(m.channels, "count"));
    return m;
  });

  months = sort(months, "month", -1);
  return months;
};

module.exports = wrapMonths;
