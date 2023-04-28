import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "boardCommentList",
  storage: localStorage,
});

export const boardCommentList = atom({
  key: "boardCommentList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
