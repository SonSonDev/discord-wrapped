const { sort, getTop } = require("../../utils");
const fillMentions = require("../users/mentions");
const { messagesNumber, emojisNumber, linksNumber, picturesNumber, editsNumber, spoilsNumber } = require("./users");

const rankingsList = [
  [ "messagesNumber", "Nombres de messages", messagesNumber ],
  [ "emojisNumber", "Nombres de emojis", emojisNumber ],
  [ "linksNumber", "Nombres de liens partagés", linksNumber ],
  [ "picturesNumber", "Nombres d'images envoyées", picturesNumber ],
  [ "editsNumber", "Nombres de messages modifiés", editsNumber ],
  [ "spoilsNumber", "Nombres de spoils", spoilsNumber ],
  [ "mentionsNumber", "Nombres de fois mentionné", fillMentions ],
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
    a.users = getTop(sort(a.users, "count"), 5);
  });

  return rankings;
};

module.exports = wrapRankings;
