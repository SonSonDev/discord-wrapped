const { sort, getTop } = require("../../utils");
const { messagesNumber } = require("./users");

const wrapAwards = (messages) => {
  const awards = {
    messagesNumber: [], //the flooder
    wordsNumber: [], //the dictionary
    longestMessage: [], //the novelist
    emojisNumber: [], //the nitro
    reactionsNumber: [], //the reactionner
    linksNumber: [], //the shitposter
    picturesNumber: [], //the screenshoter
    editsNumber: [], //the dysgraphia
    mentionsNumber: [], //the beloved
  };

  messages.reduce((acc, cur) => {
    acc.messagesNumber = messagesNumber(acc.messagesNumber, cur);
    return acc;
  }, awards);

  awards.messagesNumber = getTop(sort(awards.messagesNumber, "count"), 5);

  return awards;
};

module.exports = wrapAwards;
