import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: localStorage,
});

export const userInfoState = atom({
  key: "userData",
  default: {
    userNick: "",
    userPassword: "",
  },
  effects_UNSTABLE: [persistAtom],
});
