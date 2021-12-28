exports.timeout = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

exports.getWords = function (string) {
  return string
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .split(/\s/)
    .filter(e => e.length > 5);
};

exports.sort = function (array, type) {
  return array.sort((a, b) => b[type] - a[type]);
};

exports.getTop = function (array, n = 10) {
  return array.slice(0, n);
};

exports.regex = {
  emoji: /<(a?):([^<>]+):([0-9]+)>/,
  emojiG: /<(a?):([^<>]+):([0-9]+)>/g,
  url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
  urlG: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g,
  spoiler: /\|\|.+\|\|/,
};
