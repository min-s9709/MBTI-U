import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 650px;
  margin-top: 5px;
  margin-bottom: 15px;
  border-bottom: 2px solid #b2bec3;
  padding: 5px;
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  margin-left: 100px;
  padding-bottom: 10px;
  a:hover {
    color: #b2bec3;
  }
  h3 {
    margin-left: 5px;
  }
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: green;
  margin-left: 50px;
`;

const ChatUserItem = ({ nick }) => {
  return (
    <Container>
      <UserWrapper>
        <Link to={`/chat/${nick}`}>
          <h3>
            <FontAwesomeIcon icon={faUser} /> {nick}
          </h3>
        </Link>
      </UserWrapper>
      <UserWrapper>
        <Circle />
      </UserWrapper>
    </Container>
  );
};

export default ChatUserItem;
