exports.timeout = function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

exports.getWords = function (string) {
  return string
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .split(/\s/)
    .filter(e => e.length > 5)
}