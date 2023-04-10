import styled from "styled-components";

const boardList = [
  {
    id: 1,
    title: "제목 1",
    content: "내용 1",
    viewCnt: 0,
    regDate: Date.now(),
  },
  {
    id: 2,
    title: "제목 2",
    content: "내용 2",
    viewCnt: 0,
    regDate: Date.now(),
  },
  {
    id: 3,
    title: "제목 3",
    content: "내용 3",
    viewCnt: 0,
    regDate: Date.now(),
  },
  {
    id: 4,
    title: "제목 4",
    content: "내용 4",
    viewCnt: 0,
    regDate: Date.now(),
  },
  {
    id: 5,
    title: "제목 5",
    content: "내용 5",
    viewCnt: 0,
    regDate: Date.now(),
  },
  {
    id: 6,
    title: "제목 6",
    content: "내용 6",
    viewCnt: 0,
    regDate: Date.now(),
  },
  {
    id: 7,
    title: "제목 7",
    content: "내용 7",
    viewCnt: 0,
    regDate: Date.now(),
  },
  {
    id: 8,
    title: "제목 8",
    content: "내용 8",
    viewCnt: 0,
    regDate: Date.now(),
  },
  {
    id: 9,
    title: "제목 9",
    content: "내용 9",
    viewCnt: 0,
    regDate: Date.now(),
  },
  {
    id: 10,
    title: "제목 10",
    content: "내용 10",
    viewCnt: 0,
    regDate: Date.now(),
  },
];

const BoardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

const PostButtonWrapper = styled.div``;

const Button = styled.button``;

const BoardItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin-bottom: 15px;
`;

const BoardListItem = ({ id, title, viewCnt, regDate }) => {
  return (
    <ItemContainer>
      <div>
        <h3>{id}</h3>
      </div>
      <div>
        <h3> {title}</h3>
      </div>
      <div>
        <h3> 조회수 : {viewCnt}</h3>
      </div>
      <div>
        <h3> 작성일 : {regDate}</h3>
      </div>
    </ItemContainer>
  );
};

const Board = () => {
  return (
    <BoardListWrapper>
      <PostButtonWrapper>
        <Button>글 작성하기</Button>
      </PostButtonWrapper>
      <BoardItemWrapper>
        {boardList.map((item) => (
          <BoardListItem key={item.id} {...item} />
        ))}
      </BoardItemWrapper>
    </BoardListWrapper>
  );
};

export default Board;
