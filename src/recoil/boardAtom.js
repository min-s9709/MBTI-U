import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "boardList",
  storage: localStorage,
});

export const boardList = atom({
  key: "boardList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
