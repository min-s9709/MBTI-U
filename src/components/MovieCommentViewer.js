import styled from "styled-components";
import {
  Button,
  CommentContent,
  CommentHead,
  CommentPost,
} from "./BoardCommentViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/userAtom";
import { useState } from "react";

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
  const { userNick } = useRecoilValue(userInfoState);
  const [movieComment, setMovieComment] = useState("");
  const movieCommentChange = (e) => {
    setMovieComment(e.target.value);
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
        <Button>등록하기</Button>
      </CommentPost>
    </MovieCommentWrapper>
  );
};

export default MovieCommentViewer;
