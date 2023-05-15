import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
  margin-top: 120px;
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 65vw;
  gap: 2em;
  div:first-child {
    grid-column: span 2;
  }
  margin: 0 auto;
`;

const HomeBox = styled.div`
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    scale: 1.1;
  }
  transition: scale, 0.5s, tween;
  h2 {
    font-size: 32px;
    font-weight: 550;
  }
  p {
    margin-top: 20px;
    font-size: 24px;
  }
`;

const HomeViewer = () => {
  const navigate = useNavigate();
  const onClickBoard = () => {
    navigate("/board");
  };
  const onClickMovie = () => {
    navigate("/movie");
  };
  const onClickChat = () => {
    navigate("/chat");
  };
  return (
    <Wrapper>
      <Grid>
        <HomeBox onClick={onClickBoard}>
          <h2>MBTI 게시판에서 소통해보세요! ✨</h2>
          <p>자신과 같은 MBTI를 가진 사람들과 자유롭게 소통할수 있습니다.</p>
        </HomeBox>
        <HomeBox onClick={onClickMovie}>
          <h2>영화 추천! 🎥</h2>
          <p>MBTI에 따라 영화를 추천해드립니다.</p>
        </HomeBox>
        <HomeBox onClick={onClickChat}>
          <h2>채팅으로 소통하기! 💬</h2>
          <p>같은 MBTI를 가진 사람과 대화해보세요.</p>
        </HomeBox>
      </Grid>
    </Wrapper>
  );
};

export default HomeViewer;
