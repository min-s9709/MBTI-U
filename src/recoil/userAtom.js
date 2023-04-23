import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const loadUserData = () => {
  const user = localStorage.getItem("userData");
  if (user) {
    return JSON.parse(user);
  } else {
    return {
      userNick: "",
      userMBIT: "",
    };
  }
};

const { persistAtom } = recoilPersist({
  key: "userData",
  storage: localStorage,
});

export const userInfoState = atom({
  key: "userData",
  default: loadUserData(),
  effects_UNSTABLE: [persistAtom],
});
