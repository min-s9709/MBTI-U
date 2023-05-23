import {
  CommentItemContent,
  CommentItemHead,
  CommentListItem,
} from "./BoardCommentListItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faUser } from "@fortawesome/free-regular-svg-icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/userAtom";
import { useNavigate } from "react-router-dom";
import { delMovieComment, logoutRequest } from "../lib/api";
import Swal from "sweetalert2";
import { removeCookie } from "../util/cookie";
import { isLogin } from "../recoil/loginStatus";
const MovieCommentListItem = ({
  movieId,
  commenId,
  writer,
  mcommentContent,
}) => {
  const { userNick } = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useRecoilState(isLogin);
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
  const handleCommentDelete = async () => {
    try {
      if (userNick === writer) {
        const result = await delMovieComment(movieId, commenId);
        if (result.resultCode === "success") {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "후기 삭제 완료!",
          });
          navigate(`/movie/${movieId}/detail`);
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
          navigate("/login");
        } catch (e) {}
      }
    }
  };
  return (
    <>
      <CommentListItem>
        <CommentItemHead>
          <FontAwesomeIcon icon={faUser} />
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
