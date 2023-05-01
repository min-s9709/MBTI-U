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

export const boardWriteRequest = (item) => {
  return axios
    .post("/boardwrite", {
      title: item.title,
      nick: item.userNick,
      content: item.body,
      regdate: item.regdate,
      mbti: item.userMBTI,
    })
    .then((response) => response.data);
};

export const boardListGetRequest = () => {
  return axios.get("/board").then((response) => response.data);
};

export const boardItemDelete = (id) => {
  return axios.delete(`/board/${id}`).then((response) => response.data);
};

export const boardCommentPost = (id, item) => {
  return axios
    .post(`/board/${id}/boardcomment`, {
      content: item.commentContent,
      regdate: item.regdate,
      writer: item.writer,
    })
    .then((response) => response.data);
};

export const getBoardCommentList = (id) => {
  return axios
    .get(`/board/${id}/boardcomment`)
    .then((response) => response.data);
};

export const delBoardComment = (articleId, commentid) => {
  return axios
    .delete(`/board/${articleId}/boardcomment/${commentid}`)
    .then((response) => response.data);
};
