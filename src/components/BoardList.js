import styled from "styled-components";
import BoardListItem from "./BoardListItem";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/userAtom";
import Pagination from "react-js-pagination";
import { useEffect, useState } from "react";
import { boardListGetRequest } from "../lib/api";
import { boardList } from "../recoil/boardAtom";

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
  margin-top: 5px;
`;

export const PaginationBox = styled.div`
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
  const [board, setBoard] = useRecoilState(boardList);
  const [page, setPage] = useState(1);
  const items = 10;
  const navigate = useNavigate();
  useEffect(() => {
    const getBoardList = async () => {
      const result = await boardListGetRequest();
      setBoard(result);
    };
    getBoardList();
  }, [setBoard]);
  const boardMbtiList = board.filter((item) => item.mbti === userData.userMBTI);
  const sortedBoardList = boardMbtiList.sort((a, b) => b.id - a.id);
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
        {sortedBoardList
          ? sortedBoardList
              .slice(items * (page - 1), items * (page - 1) + items)
              .map((item) => <BoardListItem key={item.id} {...item} />)
          : null}
      </BoardItemWrapper>
      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={sortedBoardList.length - 1}
          pageRangeDisplayed={
            sortedBoardList.length % items === 0
              ? sortedBoardList.length / items
              : sortedBoardList.length / items + 1
          }
          onChange={handlePageChange}
        />
      </PaginationBox>
    </BoardListWrapper>
  );
};

export default BoardList;
