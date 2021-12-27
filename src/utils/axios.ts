import axios from "axios";
import { IContent } from "./interfaces";

const instance = axios.create({
  baseURL: "https://api.github.com/gists",
});

const getContent = async (id: string|undefined): Promise<IContent> => {
  const response = (await instance.get(`/${process.env.REACT_APP_GIST_TOKEN}`));
  const data = response.data.files[`${id}.json`];

  return data ? JSON.parse(data.content) : {};
};

export { getContent };
