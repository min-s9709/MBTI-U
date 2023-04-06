import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const loadLoginStatus = () => {
  const logined = localStorage.getItem("isLogined");
  if (logined) {
    return JSON.parse(logined);
  } else {
    return {
      login: false,
    };
  }
};
const { persistAtom } = recoilPersist({
  key: "isLogined",
  storage: localStorage,
});
export const isLogin = atom({
  key: "isLogined",
  default: loadLoginStatus(),
  effects_UNSTABLE: [persistAtom],
});
