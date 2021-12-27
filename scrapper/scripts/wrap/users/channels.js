const fillChannels = (channelsArray, message) => {
  let index = channelsArray.findIndex(c => c.name === message.channel);
  if (index === -1) {
    channelsArray.push({
      name: message.channel,
      count: 0,
    });
    index = channelsArray.length - 1;
  }
  channelsArray[index].count += 1;

  return channelsArray;
};

module.exports = fillChannels;
