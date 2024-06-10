import moment from "moment";
import { sort, getTop } from "../../utils/index.js";
import fillUsers from "../channels/users.js";
import fillChannels from "../users/channels.js";

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

export default wrapMonths;
