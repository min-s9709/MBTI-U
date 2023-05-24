import axios from "axios";
import { getCookie } from "../util/cookie.js";
const API_KEY = "c3a057ebb4285a89137e6bef38fd3dd0";
const BASE_PATH = "https://api.themoviedb.org/3";

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
/* */
export const boardWriteRequest = (item) => {
  const accessToken = getCookie("loginToken");
  return axios
    .post(
      "/boardwrite",
      {
        title: item.title,
        nick: item.userNick,
        content: item.body,
        regdate: item.regdate,
        mbti: item.userMBTI,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response.data);
};

export const boardListGetRequest = () => {
  const accessToken = getCookie("loginToken");
  return axios
    .get("/board", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
};

export const boardItemDelete = (id) => {
  const accessToken = getCookie("loginToken");
  return axios
    .delete(`/board/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
};

export const boardCommentPost = (id, item) => {
  const accessToken = getCookie("loginToken");
  return axios
    .post(
      `/board/${id}/boardcomment`,
      {
        content: item.commentContent,
        regdate: item.regdate,
        writer: item.writer,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response.data);
};

export const getBoardCommentList = (id) => {
  const accessToken = getCookie("loginToken");
  return axios
    .get(`/board/${id}/boardcomment`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
};

export const delBoardComment = (articleId, commentid) => {
  const accessToken = getCookie("loginToken");
  return axios
    .delete(`/board/${articleId}/boardcomment/${commentid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
};

export const getMovies = (id) => {
  return axios
    .get(
      `${BASE_PATH}/discover/movie?api_key=${API_KEY}&language=ko-KR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`
    )
    .then((response) => response.data);
};

export const getMovieDetail = (id) => {
  return axios
    .get(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=ko-KR`)
    .then((response) => response.data);
};

export const postMovieComment = (id, userNick, movieComment) => {
  const accessToken = getCookie("loginToken");
  return axios
    .post(
      `/movierecommendation/${id}/moviecomment`,
      {
        writer: userNick,
        mcommentContent: movieComment,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => response.data);
};

export const getMovieComments = (id) => {
  const accessToken = getCookie("loginToken");
  return axios
    .get(`/movierecommendation/${id}/moviecomment`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
};

export const delMovieComment = (movieId, mcommentId) => {
  const accessToken = getCookie("loginToken");
  return axios
    .delete(`/movierecommendation/${movieId}/moviecomment/${mcommentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
};

export const logoutRequest = (userNick) => {
  return axios
    .post(`/min`, {
      nick: userNick,
    })
    .then((response) => response.data);
};

export const loginedUserList = () => {
  const accessToken = getCookie("loginToken");
  return axios
    .get("/login/userlist", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => response.data);
};
