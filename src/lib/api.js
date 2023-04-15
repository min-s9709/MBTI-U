import axios from "axios";

export const registerRequest = (userData) => {
  const result = axios
    .post("/register", {
      nick: userData.userRegisterNick,
      pw: userData.userRegisterPassword,
      mbti: userData.userMBTI,
    })
    .then((response) => response.data);
  return result;
};
