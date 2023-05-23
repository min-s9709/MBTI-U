import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { delBoardComment, logoutRequest } from "../lib/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/userAtom";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import { isLogin } from "../recoil/loginStatus";
import { removeCookie } from "../util/cookie";
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
    margin-left: 5px;
    font-weight: 550;
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
  const [isLogined, setIsLogined] = useRecoilState(isLogin);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    try {
      if (userNick === writer) {
        const result = await delBoardComment(articleId, id);
        if (result.resultCode === "success") {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "댓글 삭제 완료!",
          });
          navigate(`/board/${articleId}`);
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Fail!",
          text: "삭제 권한이 없습니다!",
        });
      }
    } catch (e) {
      if (e.response.status === 401) {
        try {
          const logoutResult = await logoutRequest(userNick);

          if (logoutResult.resultCode === "success") {
            logoutProcess();
          }
        } catch (e) {}
      }
      navigate("/login");
    }
  };

  return (
    <>
      <CommentListItem>
        <CommentItemHead>
          <FontAwesomeIcon icon={faUser} />
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
