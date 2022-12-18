const { sort, getTop } = require("../../utils");
const fillMentions = require("../users/mentions");
const { messagesNumber, emojisNumber, linksNumber, picturesNumber, editsNumber, spoilsNumber } = require("./users");

const rankingsList = [
  [ "messagesNumber", "Messages", messagesNumber ],
  [ "emojisNumber", "Emojis", emojisNumber ],
  [ "linksNumber", "Liens partagés", linksNumber ],
  [ "picturesNumber", "Images envoyées", picturesNumber ],
  [ "editsNumber", "Messages modifiés", editsNumber ],
  [ "spoilsNumber", "Spoils", spoilsNumber ],
  [ "mentionsNumber", "Mentions", fillMentions ],
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

module.exports = wrapRankings;
