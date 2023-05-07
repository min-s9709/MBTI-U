import styled from "styled-components";
import {
  CommentItemContent,
  CommentItemHead,
  CommentListItem,
} from "./BoardCommentListItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/userAtom";
import { useNavigate } from "react-router-dom";
import { delMovieComment } from "../lib/api";
const MovieCommentListItem = ({
  movieId,
  commenId,
  writer,
  mcommentContent,
}) => {
  const { userNick } = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const handleCommentDelete = async () => {
    try {
      if (userNick === writer) {
        const result = await delMovieComment(movieId, commenId);
        if (result.resultCode === "success") {
          alert("삭제 완료");
          navigate(`/movie/${movieId}/detail`);
        } else {
          alert("삭제 권한이 없습니다.");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <CommentListItem>
        <CommentItemHead>
          <h3>{writer}</h3>
          <button onClick={handleCommentDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </CommentItemHead>
        <CommentItemContent>{mcommentContent}</CommentItemContent>
      </CommentListItem>
    </>
  );
};

export default MovieCommentListItem;
