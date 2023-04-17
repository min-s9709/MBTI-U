import axios from "axios";

export const registerRequest = (userData) => {
  const result = axios
    .post("/register", {
      nick: userData.userRegisterNick,
      pw: userData.userRegisterPassword,
      mbti: userData.userMBTI.toUpperCase(),
    })
    .then((response) => response.data);
  return result;
};

export const loginRequest = (userNick, userPassword) => {
  const result = axios
    .post("/login", {
      nick: userNick,
      pw: userPassword,
    })
    .then((response) => response.data);
  return result;
};
