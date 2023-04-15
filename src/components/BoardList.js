import styled from "styled-components";
import BoardListItem from "./BoardListItem";
import { useNavigate } from "react-router-dom";

const boardList = [
  {
    id: 1,
    title: "고민이 있습니다...",
    content: "내용 1",
    viewCnt: 0,
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    title: "제목 2",
    content: "내용 2",
    viewCnt: 0,
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 3,
    title: "제목 3",
    content: "내용 3",
    viewCnt: 0,
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 4,
    title: "제목 4",
    content: "내용 4",
    viewCnt: 0,
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 5,
    title: "제목 5",
    content: "내용 5",
    viewCnt: 0,
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 6,
    title: "제목 6",
    content: "내용 6",
    viewCnt: 0,
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 7,
    title: "제목 7",
    content: "내용 7",
    viewCnt: 0,
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 8,
    title: "제목 8",
    content: "내용 8",
    viewCnt: 0,
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 9,
    title: "제목 9",
    content: "내용 9",
    viewCnt: 0,
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 10,
    title: "제목 10",
    content: "내용 10",
    viewCnt: 0,
    regDate: new Date().toLocaleDateString(),
  },
];

const BoardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 800px;
  height: 100vh;
  margin-top: 100px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3rem rgba(0, 0, 0, 0.25), 0 2px 1px rgba(0, 0, 0, 0.22);
`;

const MbtiBoardName = styled.h1`
  font-size: 36px;
`;

const PostButtonWrapper = styled.div`
  width: 150px;
  margin-bottom: 15px;
`;

const BoardInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  background-color: #74b9ff;
  color: white;
`;

const Button = styled.button`
  width: 100%;
  cursor: pointer;
  background-color: #2980b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  margin-top: 10px;
  font-size: 15px;
  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin-right: 55px;
  margin-left: 50px;
`;

const BoardItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const BoardList = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/boardwrite");
  };
  return (
    <BoardListWrapper>
      <MbtiBoardName>ESTP 게시판</MbtiBoardName>
      <PostButtonWrapper>
        <Button onClick={onClick}>글 작성하기</Button>
      </PostButtonWrapper>
      <BoardInfo>
        <InfoWrapper>
          <h2>번호</h2>
        </InfoWrapper>
        <InfoWrapper>
          <h2>제목</h2>
        </InfoWrapper>
        <InfoWrapper>
          <h2>조회수</h2>
        </InfoWrapper>
        <InfoWrapper>
          <h2>작성일</h2>
        </InfoWrapper>
      </BoardInfo>
      <BoardItemWrapper>
        {boardList.map((item) => (
          <BoardListItem key={item.id} {...item} />
        ))}
      </BoardItemWrapper>
    </BoardListWrapper>
  );
};

export default BoardList;