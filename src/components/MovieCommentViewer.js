import styled from "styled-components";
import {
  Button,
  CommentContent,
  CommentHead,
  CommentPost,
} from "./BoardCommentViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/userAtom";
import { useState, useEffect } from "react";
import {
  getMovieComments,
  loginRequest,
  logoutRequest,
  postMovieComment,
} from "../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import { movieCommentList } from "../recoil/movieComment";
import MovieCommentListItem from "./MovieCommentListItem";
import { PaginationBox } from "./BoardList";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import { isLogin } from "../recoil/loginStatus";
import { removeCookie } from "../util/cookie";
const MovieCommentWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  width: 1024px;
  margin: 0 auto;
  margin-top: 30px;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const MovieCommentViewer = () => {
  const { id } = useParams();
  const items = 5;
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { userNick } = useRecoilValue(userInfoState);
  const [movieComment, setMovieComment] = useState("");
  const [movieComments, setMovieComments] = useRecoilState(movieCommentList);
  const [isLogined, setIsLogined] = useRecoilState(isLogin);
  useEffect(() => {
    const getMovieCommentList = async () => {
      try {
        const result = await getMovieComments(id);
        setMovieComments(result);
      } catch (e) {
        if (e.response.status === 401) {
          try {
            const logoutResult = await logoutRequest(userNick);

            if (logoutResult.resultCode === "success") {
              logoutProcess();
            }
          } catch (e) {}
          navigate("/login");
        }
      }
    };
    getMovieCommentList();
  }, []);

  const movieCommentsList = [...movieComments];
  const sortedMovieComments = movieCommentsList.sort(
    (a, b) => b.commenId - a.commenId
  );

  const movieCommentChange = (e) => {
    setMovieComment(e.target.value);
  };
  const handlePageChange = (page) => {
    setPage(page);
  };
  const logoutProcess = () => {
    Swal.fire({
      icon: "error",
      title: "세션 만료",
      text: "다시 로그인이 필요합니다!",
    });
    setIsLogined((prev) => ({
      ...prev,
      login: !prev.login,
    }));
    removeCookie("loginToken");
    localStorage.clear();
  };
  const onPostComment = async () => {
    try {
      const result = await postMovieComment(id, userNick, movieComment);
      if (result.resultCode === "success") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "후기 작성 완료!",
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Fail!",
        text: "후기 작성 실패!",
      });
    }
    setMovieComment("");
    navigate(`/movie/${id}/detail`);
  };
  return (
    <MovieCommentWrapper>
      <CommentHead>
        <h2>후기</h2>
        <FontAwesomeIcon icon={faCommentDots} size="xl" />
      </CommentHead>
      <CommentPost>
        <CommentContent
          onChange={movieCommentChange}
          value={movieComment}
          placeholder="후기를 남겨주세요."
        />
        <Button onClick={onPostComment}>등록하기</Button>
      </CommentPost>
      {sortedMovieComments
        ? sortedMovieComments
            .slice(items * (page - 1), items * (page - 1) + items)
            .map((item) => (
              <MovieCommentListItem
                movieId={id}
                key={item.mcommenId}
                {...item}
              />
            ))
        : null}
      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={sortedMovieComments.length - 1}
          pageRangeDisplayed={
            sortedMovieComments.length % items === 0
              ? sortedMovieComments.length / items
              : sortedMovieComments.length / items + 1
          }
          onChange={handlePageChange}
        />
      </PaginationBox>
    </MovieCommentWrapper>
  );
};

export default MovieCommentViewer;
