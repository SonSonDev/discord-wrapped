import { getWords, regex } from "../../utils/index.js";

const fillEmojis = (emojisArray, message) => {
  const words = getWords(message.content)
    .filter(e => e.match(regex.emoji));

  words.forEach(word => {
    let index = emojisArray.findIndex(w => w.text === word);
    if (index === -1) {

      const m = word.match(regex.emoji);
      emojisArray.push({
        text: word,
        name: m[2],
        url: `https://cdn.discordapp.com/emojis/${m[3]}.${m[1] ? "gif" : "png"}`,
        count: 0,
      });
      index = emojisArray.length - 1;
    }
    emojisArray[index].count += 1;
  });

  return emojisArray;
};

export default fillEmojis;
