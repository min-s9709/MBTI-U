import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { delBoardComment } from "../lib/api";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/userAtom";
import { useNavigate } from "react-router-dom";
export const CommentListItem = styled.div`
  border-bottom: 2px solid #b2bec3;
  padding-bottom: 25px;
`;

export const CommentItemHead = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 10px;
  h3 {
    font-size: 12px;
    font-weight: 500;
    margin-right: 10px;
  }
  span {
    font-size: 12px;
  }
  button {
    border: none;
    cursor: pointer;
    margin-left: 10px;
    padding: 5px 10px;
    background-color: inherit;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const CommentItemContent = styled.div`
  padding-top: 20px;
`;

const BoardCommentListItem = ({ articleId, id, content, regdate, writer }) => {
  const { userNick } = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      if (userNick === writer) {
        const result = await delBoardComment(articleId, id);
        if (result.resultCode === "success") {
          alert("댓글 삭제 완료");
          navigate(`/board/${articleId}`);
        }
      } else {
        alert("댓글 삭제 권한이 없습니다.");
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
          <span>{regdate}</span>
          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </CommentItemHead>
        <CommentItemContent>{content}</CommentItemContent>
      </CommentListItem>
    </>
  );
};

export default BoardCommentListItem;
