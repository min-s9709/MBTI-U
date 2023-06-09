import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import BoardCommentListItem from "./BoardCommentListItem";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  boardCommentPost,
  getBoardCommentList,
  logoutRequest,
} from "../lib/api";
import { userInfoState } from "../recoil/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardCommentList } from "../recoil/boardComment";
import Pagination from "react-js-pagination";
import { PaginationBox } from "./BoardList";
import Swal from "sweetalert2";
import { removeCookie } from "../util/cookie";
import { isLogin } from "../recoil/loginStatus";
export const CommentWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  width: 1024px;
  margin: 0 auto;
  margin-top: 50px;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CommentHead = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  h2 {
    margin-right: 10px;
  }
`;

export const CommentPost = styled.div`
  display: flex;
  margin-top: 15px;
  border-bottom: 2px solid lightgray;
  padding-bottom: 20px;
  align-items: center;
  font-style: inherit;
`;

export const CommentContent = styled.textarea`
  width: 100%;
  height: 50px;
  padding: 5px;
  border: 2px solid #b2bec3;
  border-radius: 10px;
`;

export const Button = styled.button`
  width: 100px;
  cursor: pointer;
  background-color: #2980b9;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  margin-left: 15px;
  font-size: 12px;
  font-weight: 500;
  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;

const BoardCommentViewer = () => {
  const { id } = useParams();
  const userData = useRecoilValue(userInfoState);
  const [boardComments, setBoardComments] = useRecoilState(boardCommentList);
  const [isLogined, setIsLogined] = useRecoilState(isLogin);
  const [commentContent, setCommentContent] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const items = 5;
  const newCommentItem = {
    commentContent,
    regdate: new Date().toLocaleDateString(),
    writer: userData.userNick,
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

  useEffect(() => {
    const getCommentList = async () => {
      try {
        const result = await getBoardCommentList(id);
        setBoardComments(result);
      } catch (e) {
        if (e.response.status === 401) {
          try {
            const logoutResult = await logoutRequest(userData.userNick);
            if (logoutResult.resultCode === "success") {
              logoutProcess();
            }
          } catch (e) {}
          navigate("/login");
        }
      }
    };
    getCommentList();
  }, []);

  const boardCommentsList = [...boardComments];
  const sortedBoardComments = boardCommentsList.sort((a, b) => b.id - a.id);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleCommentChange = (e) => {
    setCommentContent(e.target.value);
  };
  const handleCommentPost = async () => {
    try {
      const result = await boardCommentPost(id, newCommentItem);
      if (result.resultCode === "success") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "댓글 작성 완료!",
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "댓글 작성 실패",
      });
    }
    setCommentContent("");
    navigate(`/board/${id}`);
  };
  return (
    <CommentWrapper>
      <CommentHead>
        <h2>댓글</h2>
        <FontAwesomeIcon icon={faCommentDots} size="xl" />
      </CommentHead>
      <CommentPost>
        <CommentContent
          onChange={handleCommentChange}
          value={commentContent}
          placeholder="댓글을 작성해주세요."
        ></CommentContent>
        <Button onClick={handleCommentPost}>등록하기</Button>
      </CommentPost>
      {sortedBoardComments
        ? sortedBoardComments
            .slice(items * (page - 1), items * (page - 1) + items)
            .map((item) => (
              <BoardCommentListItem articleId={id} key={item.id} {...item} />
            ))
        : null}
      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={sortedBoardComments.length - 1}
          pageRangeDisplayed={
            sortedBoardComments.length % items === 0
              ? sortedBoardComments.length / items
              : sortedBoardComments.length / items + 1
          }
          onChange={handlePageChange}
        />
      </PaginationBox>
    </CommentWrapper>
  );
};

export default BoardCommentViewer;
