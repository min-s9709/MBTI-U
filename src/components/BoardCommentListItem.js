import styled from "styled-components";

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

const BoardCommentListItem = ({ id, content, regdate, writer }) => {
  return (
    <>
      <CommentListItem>
        <CommentItemHead>
          <h3>{writer}</h3>
          <span>{regdate}</span>
        </CommentItemHead>
        <CommentItemContent>{content}</CommentItemContent>
      </CommentListItem>
    </>
  );
};

export default BoardCommentListItem;
