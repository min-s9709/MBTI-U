import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "isLogined",
  storage: localStorage,
});
export const isLogin = atom({
  key: "isLogined",
  default: { login: false },
  effects_UNSTABLE: [persistAtom],
});
