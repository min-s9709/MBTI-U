import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 650px;
  margin-top: 5px;
  margin-bottom: 10px;
  border-bottom: 2px solid #b2bec3;
  padding: 5px;
`;

const ItemContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-left: 50px;
  padding-bottom: 5px;
  a:hover {
    color: #b2bec3;
  }
  &:nth-child(2) {
    justify-content: left;
    h3 {
      margin-left: 5px;
    }
  }
`;

const BoardListItem = ({ id, title, writer, date }) => {
  return (
    <ItemContainer>
      <ItemContentWrapper>
        <Link to={`/board/${id}`}>
          <h3>{title}</h3>
        </Link>
      </ItemContentWrapper>
      <ItemContentWrapper>
        <FontAwesomeIcon icon={faUser} />
        <h3>{writer}</h3>
      </ItemContentWrapper>
      <ItemContentWrapper>
        <h3>{date}</h3>
      </ItemContentWrapper>
    </ItemContainer>
  );
};

export default BoardListItem;
