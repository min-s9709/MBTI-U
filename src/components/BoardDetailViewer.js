import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { boardList } from "../recoil/boardAtom";
import { boardDetail } from "../recoil/boardItem";
import { boardItemDelete } from "../lib/api";
import { userInfoState } from "../recoil/userAtom";
import Swal from "sweetalert2";
const BoardDetailWrapper = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  width: 1024px;
  margin: 0 auto;
  margin-top: 80px;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const BoardHead = styled.div`
  border-bottom: 2px solid #636e72;
  padding-bottom: 25px;
  margin-bottom: 25px;
  h1 {
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 20px;
  }
`;

const BoardSubInfo = styled.div`
  margin-top: 10px;
  color: #b2bec3;
  span {
    margin-right: 10px;
    padding-left: 2px;
    padding-right: 5px;
  }
`;

const BoardContent = styled.div`
  font-size: 15px;
  padding-top: 15px;
  padding-bottom: 30px;
  border-bottom: 2px solid lightgray;
`;

const Button = styled.button`
  width: 100px;
  cursor: pointer;
  background-color: #2980b9;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  margin-top: 18px;
  margin-right: 15px;
  font-size: 12px;
  font-weight: 500;
  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;

const BoardDetailViewer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const board = useRecoilValue(boardList);
  const userData = useRecoilValue(userInfoState);
  const [boardDetailItem, setBoardDetailItem] = useRecoilState(boardDetail);
  const [boardItem] = board.filter((item) => item.id === Number(id));
  useEffect(() => {
    setBoardDetailItem(boardItem);
    if (isOpen) {
      navigate(`/board/${id}/boardcomment`);
    } else {
      navigate(`/board/${id}`);
    }
  }, [id, navigate, isOpen, boardItem, setBoardDetailItem]);
  const onClick = () => {
    navigate("/board");
  };
  const handleComment = () => {
    setIsOpen((prev) => !prev);
  };
  const handleDelete = async () => {
    try {
      if (boardDetailItem.writer === userData.userNick) {
        const deleteResult = await boardItemDelete(id);
        if (deleteResult.resultCode === "success") {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "게시글 삭제 완료!",
          });
          navigate("/board");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Fail!",
          text: "삭제 권한이 없습니다!",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <BoardDetailWrapper>
      <BoardHead>
        <h1>{boardDetailItem && boardDetailItem.title}</h1>
        <BoardSubInfo>
          <span>{boardDetailItem && boardDetailItem.writer}</span>
          <span>{boardDetailItem && boardDetailItem.date}</span>
        </BoardSubInfo>
      </BoardHead>
      <BoardContent
        dangerouslySetInnerHTML={{
          __html: boardDetailItem && boardDetailItem.content,
        }}
      ></BoardContent>
      <Button onClick={onClick}>게시글 목록</Button>
      <Button onClick={handleComment}>
        {isOpen ? "댓글 접기" : "댓글 펼치기"}
      </Button>
      <Button onClick={handleDelete}>삭제하기</Button>
    </BoardDetailWrapper>
  );
};

export default BoardDetailViewer;
