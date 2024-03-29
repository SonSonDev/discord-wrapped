export const timeout = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getWords = function (string) {
  return string
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .split(/\s/)
    .filter(e => e.length > 5);
};

export const sort = function (array, type, order = 1) {
  return array.sort((a, b) => (b[type] - a[type]) * order);
};

export const getTop = function (array, n = 10) {
  return array.slice(0, n);
};

export const regex = {
  emoji: /<(a?):([^<>]+):([0-9]+)>/,
  emojiG: /<(a?):([^<>]+):([0-9]+)>/g,
  url: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
  urlG: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g,
  spoiler: /\|\|.+\|\|/,
};
