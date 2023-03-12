import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name, option) => {
  return cookies.remove(name, { ...option });
};

// login token
// 871e2c48a9e5702ec85d35bc2da13cfc072e94de9b41b165d94980c72a79e302bbabba5395c059a9674c2fec3fc9416e8e0bbb66d698e313e6e40d40710309d61b55021687d52519042a6fb608500a55bc5808dceabf30753324f7bee8b9e186a96716d37e76dd06e1c243594204ed392c3ab820323309202215dec33a5f1c8a
