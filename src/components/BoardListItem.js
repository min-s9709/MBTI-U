import { Link } from "react-router-dom";
import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 650px;
  margin-top: 5px;
  margin-bottom: 20px;
  border-bottom: 2px solid #b2bec3;
  padding: 5px;
`;

const ItemContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a:hover {
    color: #b2bec3;
  }
`;

const BoardListItem = ({ id, title, boardWriter, regDate }) => {
  return (
    <ItemContainer>
      <ItemContentWrapper>
        <Link to={`/board/${id}`}>
          <h3>{title}</h3>
        </Link>
      </ItemContentWrapper>
      <ItemContentWrapper>
        <h3>{boardWriter}</h3>
      </ItemContentWrapper>
      <ItemContentWrapper>
        <h3>{regDate}</h3>
      </ItemContentWrapper>
    </ItemContainer>
  );
};

export default BoardListItem;
