import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "chattingUserList",
  storage: localStorage,
});

export const ChatUser = atom({
  key: "chatUserList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
