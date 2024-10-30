import axios from "axios";
import config from "config/config";
import { getCookie } from "lib/Cookie";

export default axios.create({
  baseURL: config.SERVER_ADDRESS,
  headers: {
    "access-token": getCookie("access-token").id,
  },
});
