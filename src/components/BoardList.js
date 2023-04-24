import styled from "styled-components";
import BoardListItem from "./BoardListItem";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/userAtom";
import Pagination from "react-js-pagination";
import { useState } from "react";
const boardList = [
  {
    id: 1,
    title: "고민이 있습니다...........",
    content: "내용 1",
    boardWriter: "testID",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 2,
    title: "제목 2",
    content: "내용 2",
    boardWriter: "mim9709",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 3,
    title: "제목 3",
    content: "내용 3",
    boardWriter: "test1",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 4,
    title: "제목 4",
    content: "내용 4",
    boardWriter: "test2",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 5,
    title: "제목 5",
    content: "내용 5",
    boardWriter: "test3",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 6,
    title: "제목 6",
    content: "내용 6",
    boardWriter: "test4",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 7,
    title: "제목 7",
    content: "내용 7",
    boardWriter: "test5",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 8,
    title: "제목 8",
    content: "내용 8",
    boardWriter: "test6",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 9,
    title: "제목 9",
    content: "내용 9",
    boardWriter: "test7",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 10,
    title: "제목 10",
    content: "내용 10",
    boardWriter: "test8",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 11,
    title: "제목 11",
    content: "내용 11",
    boardWriter: "test8",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 12,
    title: "제목 12",
    content: "내용 12",
    boardWriter: "test8",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 13,
    title: "제목 13",
    content: "내용 13",
    boardWriter: "test8",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 14,
    title: "제목 10",
    content: "내용 10",
    boardWriter: "test8",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 15,
    title: "제목 15",
    content: "내용 15",
    boardWriter: "test8",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 16,
    title: "제목 16",
    content: "내용 16",
    boardWriter: "test8",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 17,
    title: "제목 17",
    content: "내용 17",
    boardWriter: "test8",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 18,
    title: "제목 18",
    content: "내용 18",
    boardWriter: "test8",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 19,
    title: "제목 19",
    content: "내용 19",
    boardWriter: "test8",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
  {
    id: 20,
    title: "제목 20",
    content: "내용 20",
    boardWriter: "test8",
    mbti: "ESTP",
    regDate: new Date().toLocaleDateString(),
  },
];

const BoardListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 750px;
  height: 700px;
  margin-top: 80px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3rem rgba(0, 0, 0, 0.25), 0 2px 1px rgba(0, 0, 0, 0.22);
`;

const MbtiBoardName = styled.h1`
  font-size: 32px;
`;

const PostButtonWrapper = styled.div`
  width: 120px;
  margin-bottom: 15px;
  margin-top: 10px;
`;

const BoardInfo = styled.div`
  display: flex;
  width: 650px;
  justify-content: space-around;
  align-items: center;
  background-color: #74b9ff;
  color: white;
  font-weight: 600;
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

const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;

const BoardList = () => {
  const userData = useRecoilValue(userInfoState);
  const [page, setPage] = useState(1);
  const items = 10;
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/boardwrite");
  };
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <BoardListWrapper>
      <MbtiBoardName>{userData.userMBTI} 게시판</MbtiBoardName>
      <PostButtonWrapper>
        <Button onClick={onClick}>글 작성하기</Button>
      </PostButtonWrapper>
      <BoardInfo>
        <InfoWrapper>
          <h2>제목</h2>
        </InfoWrapper>
        <InfoWrapper>
          <h2>작성자</h2>
        </InfoWrapper>
        <InfoWrapper>
          <h2>작성일</h2>
        </InfoWrapper>
      </BoardInfo>
      <BoardItemWrapper>
        {boardList
          .slice(items * (page - 1), items * (page - 1) + items)
          .map((item) => (
            <BoardListItem key={item.id} {...item} />
          ))}
      </BoardItemWrapper>
      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={boardList.length - 1}
          pageRangeDisplayed={boardList.length / items}
          onChange={handlePageChange}
        />
      </PaginationBox>
    </BoardListWrapper>
  );
};

export default BoardList;
