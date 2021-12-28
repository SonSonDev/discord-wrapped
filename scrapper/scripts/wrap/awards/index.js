const { sort, getTop } = require("../../utils");
const fillMentions = require("../users/mentions");
const { messagesNumber, emojisNumber, linksNumber, picturesNumber, editsNumber, spoilsNumber } = require("./users");

const awardsList = [
  [ "messagesNumber", "Nombres de messages", messagesNumber ],
  [ "emojisNumber", "Nombres de emojis", emojisNumber ],
  [ "linksNumber", "Nombres de liens", linksNumber ],
  [ "picturesNumber", "Nombres de images", picturesNumber ],
  [ "editsNumber", "Nombres de modifications", editsNumber ],
  [ "spoilsNumber", "Nombres de spoils", spoilsNumber ],
  [ "mentionsNumber", "Nombres de fois mentionné", fillMentions ],
];

const wrapAwards = (messages) => {
  const awards = awardsList.map(a => {
    return {
      key: a[0],
      name: a[1],
      users: [],
    };
  });

  messages.reduce((acc, cur) => {
    acc.map((a, i) => {
      a.users = awardsList[i][2](a.users, cur);
    });
    return acc;
  }, awards);
  awards.map((a) => {
    a.users = getTop(sort(a.users, "count"), 5);
  });

  return awards;
};

module.exports = wrapAwards;
