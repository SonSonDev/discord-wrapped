import axios from "axios";
import { IContent } from "../../../common/interfaces";
import * as content from "../../../common/content.json";

const instance = axios.create({
  baseURL: "https://api.github.com/gists",
});
const getContent = async (id: string | undefined): Promise<IContent> => {
  if (id === "content" && import.meta.env.MODE === "development") {
    return content;
  }

  const response = (await instance.get(`/${import.meta.env.VITE_GIST_ID}`));
  const file = response.data.files[`${id}.json`];
  if (!file?.raw_url) {
    return {} as IContent;
  }
  const { data } = (await instance.get(file.raw_url));
  return data || {} as IContent;
};

export { getContent };
