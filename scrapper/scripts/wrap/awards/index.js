const { sort, getTop } = require("../../utils");
const { messagesNumber } = require("./users");

const wrapAwards = (messages) => {
  const awards = {
    messagesNumber: [], //the flooder
    wordsNumber: [], //the dictionary
    emojisNumber: [], //the nitro
    reactionsNumber: [], //the reactionner
    linksNumber: [], //the shitposter
    picturesNumber: [], //the screenshoter
    editsNumber: [], //the error
    mentionsNumber: [], //the beloved
    spoilsNumber: [], //the spoiler
  };

  messages.reduce((acc, cur) => {
    acc.messagesNumber = messagesNumber(acc.messagesNumber, cur);


    return acc;
  }, awards);

  awards.messagesNumber = getTop(sort(awards.messagesNumber, "count"), 5);

  return awards;
};

module.exports = wrapAwards;
