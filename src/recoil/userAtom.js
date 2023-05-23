import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userData",
  storage: localStorage,
});

export const userInfoState = atom({
  key: "userData",
  default: { userNick: "", userMBTI: "" },
  effects_UNSTABLE: [persistAtom],
});
