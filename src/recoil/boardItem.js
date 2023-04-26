import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "boardItem",
  storage: localStorage,
});
export const boardDetail = atom({
  key: "boardItem",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
