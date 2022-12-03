import axios from "axios";
import { IContent } from "../../../common/interfaces";
import * as a from "../../../common/content.json";

const instance = axios.create({
  baseURL: "https://api.github.com/gists",
});
console.log(import.meta.env);
const getContent = async (id: string|undefined): Promise<IContent> => {
  if (import.meta.env.MODE === "development") {
    return a;
  }
  const response = (await instance.get(`/${import.meta.env.VITE_GIST_TOKEN}`));
  const data = response.data.files[`${id}.json`];

  return data ? JSON.parse(data.content) : {};
};

export { getContent };
