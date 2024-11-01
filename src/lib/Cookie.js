import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const setCookie = (name, value, options) => {
  return cookie.set(name, JSON.stringify(value), { ...options });
};

export const getCookie = (name) => {
  return cookie.get(name);
};
