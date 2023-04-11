import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 650px;
  margin-top: 5px;
  margin-bottom: 20px;
  border-bottom: 2px solid black;
  padding: 5px;
`;

const ItemContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoardListItem = ({ id, title, viewCnt, regDate }) => {
  return (
    <ItemContainer>
      <ItemContentWrapper>
        <h3>{id}</h3>
      </ItemContentWrapper>
      <ItemContentWrapper>
        <h3> {title}</h3>
      </ItemContentWrapper>
      <ItemContentWrapper>
        <h3>{viewCnt}</h3>
      </ItemContentWrapper>
      <ItemContentWrapper>
        <h3>{regDate}</h3>
      </ItemContentWrapper>
    </ItemContainer>
  );
};

export default BoardListItem;
