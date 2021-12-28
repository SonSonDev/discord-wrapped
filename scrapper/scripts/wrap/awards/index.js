const { sort, getTop } = require("../../utils");
const fillMentions = require("../users/mentions");
const { messagesNumber, emojisNumber, linksNumber, picturesNumber, editsNumber, mentionsNumber, spoilsNumber } = require("./users");

const wrapAwards = (messages) => {
  const awards = {
    messagesNumber: [], //the flooder
    emojisNumber: [], //the nitro
    linksNumber: [], //the shitposter
    picturesNumber: [], //the screenshoter
    editsNumber: [], //the error
    mentionsNumber: [], //the beloved
    spoilsNumber: [], //the spoiler
  };

  messages.reduce((acc, cur) => {
    acc.messagesNumber = messagesNumber(acc.messagesNumber, cur);
    acc.emojisNumber = emojisNumber(acc.emojisNumber, cur);
    acc.linksNumber = linksNumber(acc.linksNumber, cur);
    acc.picturesNumber = picturesNumber(acc.picturesNumber, cur);
    acc.editsNumber = editsNumber(acc.editsNumber, cur);
    acc.mentionsNumber = fillMentions(acc.mentionsNumber, cur);
    acc.spoilsNumber = spoilsNumber(acc.spoilsNumber, cur);

    return acc;
  }, awards);

  awards.messagesNumber = getTop(sort(awards.messagesNumber, "count"), 5);
  awards.emojisNumber = getTop(sort(awards.emojisNumber, "count"), 5);
  awards.linksNumber = getTop(sort(awards.linksNumber, "count"), 5);
  awards.picturesNumber = getTop(sort(awards.picturesNumber, "count"), 5);
  awards.editsNumber = getTop(sort(awards.editsNumber, "count"), 5);
  awards.mentionsNumber = getTop(sort(awards.mentionsNumber, "count"), 5);
  awards.spoilsNumber = getTop(sort(awards.spoilsNumber, "count"), 5);

  return awards;
};

module.exports = wrapAwards;
