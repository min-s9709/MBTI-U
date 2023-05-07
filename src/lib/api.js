import axios from "axios";

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
  return axios
    .post(`/movierecommendation/${id}/moviecomment`, {
      writer: userNick,
      mcommentContent: movieComment,
    })
    .then((response) => response.data);
};

export const getMovieComments = (id) => {
  return axios
    .get(`/movierecommendation/${id}/moviecomment`)
    .then((response) => response.data);
};

export const delMovieComment = (movieId, mcommentId) => {
  return axios
    .delete(`/movierecommendation/${movieId}/moviecomment/${mcommentId}`)
    .then((response) => response.data);
};
