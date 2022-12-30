import { regex } from "../../utils/index.js";

export const messagesNumber = (usersArray, message) => {
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

export const emojisNumber = (usersArray, message) => {
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

export const linksNumber = (usersArray, message) => {
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

export const picturesNumber = (usersArray, message) => {
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

export const editsNumber = (usersArray, message) => {
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

export const mentionsNumber = (usersArray, message) => {
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

export const spoilsNumber = (usersArray, message) => {
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
