import fs from "fs";
import inquirer from "inquirer";
import axios from "axios";
import moment from "moment";
import { IContent } from "../../common/interfaces";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
const __dirname = path.resolve();

interface IGuild {
  id: string
  name: string
}

const guildListText = fs.readFileSync(`${__dirname}/scrapper/output/guilds.json`);

const instance = axios.create({
  baseURL: "https://api.github.com/gists",
  headers: {
    "Accept": "application/vnd.github+json",
    "Authorization": `Bearer ${process.env.GIST_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  },
});

const postContent = async (guildId: string, year: number): Promise<void> => {
  const content = fs.readFileSync(`${__dirname}/scrapper/output/wrap/${guildId}-wrapped-${year}.json`).toString();

  return await instance.patch(`/${process.env.GIST_ID}`, {
    files: {
      [`${guildId}.json`]: {
        content,
      },
    },
  });
};

(async () => {
  const guildList: IGuild[] = JSON.parse(guildListText.toString());
  const { guildId, year } = await inquirer
    .prompt([
      {
        name: "guildId", type: "list", message: "What guild?",
        choices: guildList.map((g: IGuild) => ({
          value: g.id,
          name: g.name,
        })),
      },
      {
        name: "year", type: "number", message: "What year?",
        validate: function (input: number) {
          return new Promise((resolve, reject) => {
            if (!Number.isInteger(input) || input > moment().year() || input < 2012) {
              reject("Give valid year");
              return false;
            }
            resolve(true);
          });
        },
      },
    ]);

  try {
    await postContent(guildId, year);
  } catch (e) {
    console.log(e);
  }
})();

