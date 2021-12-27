# DISCORD WRAPPED

## Env variables

file: `.env`
- BOT_TOKEN: Discord Bot Token


## Cmds

Get your Bot Discord guilds list:
```sh
npm run scrap-guilds
```
output file: `/scrapper/scrap/guilds.json`

---

Get guild message:
```sh
npm run scrap -- {i}
```
- `i`: guild chosen index in `/scrapper/scrap/guilds.json`
- output file: `/scrapper/scrap/{guildname}-guild-{channel|info|messages}.json`

---

Get guild stats:
```sh
npm wrap -- {i}
```
output file: `/scrapper/output/{guildname}-wrapped.json`