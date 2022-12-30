import { sort, getTop } from "../../utils/index.js";
import fillMentions from "../users/mentions.js";
import { messagesNumber, emojisNumber, linksNumber, picturesNumber, editsNumber, spoilsNumber } from "./users.js";

const rankingsList = [
  ["messagesNumber", "Messages", messagesNumber],
  ["emojisNumber", "Emojis", emojisNumber],
  ["linksNumber", "Liens partagés", linksNumber],
  ["picturesNumber", "Images envoyées", picturesNumber],
  ["editsNumber", "Messages modifiés", editsNumber],
  ["spoilsNumber", "Spoils", spoilsNumber],
  ["mentionsNumber", "Mentions", fillMentions],
];

const wrapRankings = (messages) => {
  const rankings = rankingsList.map(a => {
    return {
      key: a[0],
      name: a[1],
      users: [],
    };
  });

  messages.reduce((acc, cur) => {
    acc.map((a, i) => {
      a.users = rankingsList[i][2](a.users, cur);
    });
    return acc;
  }, rankings);
  rankings.map((a) => {
    a.users = getTop(sort(a.users, "count"), 10);
  });

  return rankings;
};

export default wrapRankings;
