import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";

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
const CommentListItem = styled.div`
  border-bottom: 2px solid #b2bec3;
  padding-bottom: 25px;
`;

const CommentItemHead = styled.div`
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
`;

const CommentItemContent = styled.div`
  padding-top: 20px;
`;

const BoardCommentViewer = () => {
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
      <CommentListItem>
        <CommentItemHead>
          <h3>댓글 작성자</h3>
          <span>{new Date().toLocaleDateString()}</span>
        </CommentItemHead>
        <CommentItemContent>댓글 내용입니다...</CommentItemContent>
      </CommentListItem>
      <CommentListItem>
        <CommentItemHead>
          <h3>댓글 작성자</h3>
          <span>{new Date().toLocaleDateString()}</span>
        </CommentItemHead>
        <CommentItemContent>댓글 내용입니다...</CommentItemContent>
      </CommentListItem>
      <CommentListItem>
        <CommentItemHead>
          <h3>댓글 작성자</h3>
          <span>{new Date().toLocaleDateString()}</span>
        </CommentItemHead>
        <CommentItemContent>댓글 내용입니다...</CommentItemContent>
      </CommentListItem>
      <CommentListItem>
        <CommentItemHead>
          <h3>댓글 작성자</h3>
          <span>{new Date().toLocaleDateString()}</span>
        </CommentItemHead>
        <CommentItemContent>댓글 내용입니다...</CommentItemContent>
      </CommentListItem>
      <CommentListItem>
        <CommentItemHead>
          <h3>댓글 작성자</h3>
          <span>{new Date().toLocaleDateString()}</span>
        </CommentItemHead>
        <CommentItemContent>댓글 내용입니다...</CommentItemContent>
      </CommentListItem>
    </CommentWrapper>
  );
};

export default BoardCommentViewer;
