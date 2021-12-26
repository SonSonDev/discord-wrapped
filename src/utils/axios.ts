import axios from "axios";
import { IContent } from "../components/Wrapped";

const instance = axios.create({
  baseURL: "https://api.github.com/gists",
});

const getContent = async (id: string|undefined): Promise<IContent> => {
  const response = (await instance.get(`/${process.env.REACT_APP_GIST_TOKEN}`));
  return JSON.parse((response.data.files[`${id}.json`].content));
};

export { getContent };
