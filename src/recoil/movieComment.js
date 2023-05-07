import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "movieCommentList",
  storage: localStorage,
});

export const movieCommentList = atom({
  key: "MovieCommentsList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
