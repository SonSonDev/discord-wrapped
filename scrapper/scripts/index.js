const a = [
  {
    "text": "<:pikasweat:816999643434975242>",
    "count": 43,
  },
  {
    "text": "<:wtv:773312233249439785>",
    "count": 33,
  },
  {
    "text": "<:worryheart:780576984820219914>",
    "count": 32,
  },
  {
    "text": "<a:sayoneso:722886741677047929>",
    "count": 31,
  },
  {
    "text": "<:kek:678322454082355260>",
    "count": 27,
  },
  {
    "text": "<:wdym:815991224082497596>",
    "count": 21,
  },
  {
    "text": "<a:paimonstare_seseren:792310821719769098>",
    "count": 18,
  },
  {
    "text": "<:pikastare1:735026859892408351>",
    "count": 17,
  },
  {
    "text": "<:pikagesu:806583898036240434>",
    "count": 16,
  },
];

let b = a.reduce((acc, cur) => acc.concat(cur.text), []);

for (const t of b) {
  let m = t.match(/<(a?):.+:([0-9]+)>/);
  console.log(m[1] ? "gif" : "png");
  console.log(m[2]);


}
