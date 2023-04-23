import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";

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

  useEffect(() => {
    if (isOpen) {
      navigate(`/board/${id}/boardcomment`);
    } else {
      navigate(`/board/${id}`);
    }
  }, [id, navigate, isOpen]);

  const onClick = () => {
    navigate("/board");
  };
  const handleComment = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <BoardDetailWrapper>
      <BoardHead>
        <h1>제목</h1>
        <BoardSubInfo>
          <span>작성자</span>
          <span>{new Date().toLocaleDateString()}</span>
        </BoardSubInfo>
      </BoardHead>
      <BoardContent>게시글 {id} 해당되는 내용입니다...</BoardContent>
      <Button onClick={onClick}>게시글 목록</Button>
      <Button onClick={handleComment}>
        {isOpen ? "댓글 접기" : "댓글 펼치기"}
      </Button>
      <Button>삭제하기</Button>
    </BoardDetailWrapper>
  );
};

export default BoardDetailViewer;
