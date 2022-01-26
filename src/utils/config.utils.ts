import Config from "../models/config.model";
import config from "./config.json";

const getConfig = (): Config => {
  return new Config(config.wordLength, config.tries, config.lang);
};

export default getConfig;
