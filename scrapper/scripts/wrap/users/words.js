import { getWords } from "../../utils/index.js";

const fillWords = (wordsArray, message) => {
  const words = getWords(message.content)
    .filter(e => !e.match(/<.+>/));

  words.forEach(word => {
    let index = wordsArray.findIndex(w => w.text === word);
    if (index === -1) {
      wordsArray.push({
        text: word,
        count: 0,
      });
      index = wordsArray.length - 1;
    }
    wordsArray[index].count += 1;
  });

  return wordsArray;
};

export default fillWords;
