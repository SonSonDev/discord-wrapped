import { sort, getTop } from "../../utils/index.js";
import fillEmojis from "./emojis.js";
import fillUsers from "./users.js";
import { fillMonths } from "../users/time.js";

const wrapChannels = (messages) => {
  let channels = messages.reduce((acc, cur) => {
    let index = acc.findIndex(c => c.name === cur.channel);
    if (index === -1) {
      acc.push({
        name: cur.channel,
        count: 0,
        users: [],
        emojis: [],
        months: [],
      });
      index = acc.length - 1;
    }

    acc[index].count += 1;
    acc[index].users = fillUsers(acc[index].users, cur);
    acc[index].emojis = fillEmojis(acc[index].emojis, cur);
    acc[index].months = fillMonths(acc[index].months, cur);
    return acc;
  }, []);

  channels.map(c => {
    c.name = `#-${c.name}`;
    c.users = getTop(sort(c.users, "count"), 20);
    c.emojis = getTop(sort(c.emojis, "count"), 20);
    c.months = sort(c.months, "month", -1);
    return c;
  });

  channels = sort(channels, "count");
  return channels;
};

export default wrapChannels;
