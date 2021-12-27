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
  emoji: /<(a?):[^<>]+:([0-9]+)>/,
};
