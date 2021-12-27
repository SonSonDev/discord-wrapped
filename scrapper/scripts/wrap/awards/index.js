const { messagesNumber } = require("./users");

// SORT
function sort (array, type) {
  return array.sort((a, b) => b[type] - a[type]).slice(0, 10);
}

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

  awards.messagesNumber = sort(awards.messagesNumber, "count");

  return awards;
};

module.exports = wrapAwards;
