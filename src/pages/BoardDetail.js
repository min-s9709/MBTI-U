import { useParams } from "react-router-dom";
import styled from "styled-components";

const BoardDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 600px;
  height: 600px;
`;

const BoardDetailTitle = styled.div`
  width: 320px;
  height: 150px;
  margin-bottom: 50px;
  background-color: white;
`;

const BoardDetailContent = styled.div`
  width: 320px;
  height: 250px;
  background-color: white;
`;

const BoardDetail = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <BoardDetailWrapper>
      <BoardDetailTitle></BoardDetailTitle>
      <BoardDetailContent></BoardDetailContent>
    </BoardDetailWrapper>
  );
};

export default BoardDetail;
