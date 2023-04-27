import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import BoardCommentListItem from "./BoardCommentListItem";
import { useParams } from "react-router-dom";

const boardCommentList = [
  {
    id: 1,
    regdate: "2023.04.27",
    content: "test comment",
    writer: "testID",
  },
  {
    id: 2,
    regdate: "2023.04.27",
    content: "test comment2",
    writer: "testID",
  },
  {
    id: 3,
    regdate: "2023.04.27",
    content: "test comment3",
    writer: "testID",
  },
  {
    id: 4,
    regdate: "2023.04.27",
    content: "test comment4",
    writer: "testID",
  },
  {
    id: 5,
    regdate: "2023.04.27",
    content: "test comment5",
    writer: "testID",
  },
];

const CommentWrapper = styled.div`
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

const CommentHead = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  h2 {
    margin-right: 10px;
  }
`;

const CommentPost = styled.div`
  display: flex;
  margin-top: 15px;
  border-bottom: 2px solid lightgray;
  padding-bottom: 20px;
  align-items: center;
  font-style: inherit;
`;

const CommentContent = styled.textarea`
  width: 100%;
  height: 50px;
  padding: 5px;
  border: 2px solid #b2bec3;
  border-radius: 10px;
`;

const Button = styled.button`
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
  return (
    <CommentWrapper>
      <CommentHead>
        <h2>댓글</h2>
        <FontAwesomeIcon icon={faCommentDots} size="xl" />
      </CommentHead>
      <CommentPost>
        <CommentContent placeholder="댓글을 작성해주세요."></CommentContent>
        <Button>등록하기</Button>
      </CommentPost>
      {boardCommentList.map((item) => (
        <BoardCommentListItem key={item.id} {...item} />
      ))}
    </CommentWrapper>
  );
};

export default BoardCommentViewer;
