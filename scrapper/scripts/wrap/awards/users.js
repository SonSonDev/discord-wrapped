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

