const { regex } = require("../../utils");

exports.messagesNumber = (usersArray, message) => {
  let index = usersArray.findIndex(u => u.username === message.author);
  if (index === -1) {
    usersArray.push({
      username: message.author,
      avatar: message.avatar,
      count: 0,
    });
    index = usersArray.length - 1;
  }
  usersArray[index].count += 1;

  return usersArray;
};

exports.emojisNumber = (usersArray, message) => {
  const m = message.content.match(regex.emojiG);
  if (!m) return usersArray;

  let index = usersArray.findIndex(u => u.username === message.author);
  if (index === -1) {
    usersArray.push({
      username: message.author,
      avatar: message.avatar,
      count: 0,
    });
    index = usersArray.length - 1;
  }
  usersArray[index].count += m.length;

  return usersArray;
};

exports.linksNumber = (usersArray, message) => {
  const m = message.content.match(regex.urlG);
  if (!m) return usersArray;

  let index = usersArray.findIndex(u => u.username === message.author);
  if (index === -1) {
    usersArray.push({
      username: message.author,
      avatar: message.avatar,
      count: 0,
    });
    index = usersArray.length - 1;
  }
  usersArray[index].count += m.length;

  return usersArray;
};

exports.picturesNumber = (usersArray, message) => {
  if (!message.attachments) return usersArray;

  let index = usersArray.findIndex(u => u.username === message.author);
  if (index === -1) {
    usersArray.push({
      username: message.author,
      avatar: message.avatar,
      count: 0,
    });
    index = usersArray.length - 1;
  }
  usersArray[index].count += message.attachments;

  return usersArray;
};

exports.editsNumber = (usersArray, message) => {
  if (!message.edited) return usersArray;

  let index = usersArray.findIndex(u => u.username === message.author);
  if (index === -1) {
    usersArray.push({
      username: message.author,
      avatar: message.avatar,
      count: 0,
    });
    index = usersArray.length - 1;
  }
  usersArray[index].count += 1;

  return usersArray;
};

exports.mentionsNumber = (usersArray, message) => {
  let index = usersArray.findIndex(u => u.username === message.author);
  if (index === -1) {
    usersArray.push({
      username: message.author,
      avatar: message.avatar,
      count: 0,
    });
    index = usersArray.length - 1;
  }

  return usersArray;
};

exports.spoilsNumber = (usersArray, message) => {
  const m = message.content.match(regex.spoiler);
  if (!m) return usersArray;

  let index = usersArray.findIndex(u => u.username === message.author);
  if (index === -1) {
    usersArray.push({
      username: message.author,
      avatar: message.avatar,
      count: 0,
    });
    index = usersArray.length - 1;
  }
  usersArray[index].count += 1;

  return usersArray;
};
