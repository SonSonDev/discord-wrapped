const fillMentions = (mentionsArray, message) => {
  message.mentions.forEach(mention => {
    let index = mentionsArray.findIndex(m => m.username === mention.username);
    if (index === -1) {
      mentionsArray.push({
        username: mention.username,
        avatar: mention.avatar,
        count: 0,
      });
      index = mentionsArray.length - 1;
    }
    mentionsArray[index].count += 1;

    return mentionsArray;
  });

  return mentionsArray;
};

export default fillMentions;
