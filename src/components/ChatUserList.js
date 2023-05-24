import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfoState } from "../recoil/userAtom";
import { isLogin } from "../recoil/loginStatus";
import Swal from "sweetalert2";
import { removeCookie } from "../util/cookie";
import { loginedUserList, logoutRequest } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { ChatUser } from "../recoil/ChatUserAtom";
import ChatUserItem from "./ChatUserItem";
import { PaginationBox } from "./BoardList";
import Pagination from "react-js-pagination";

const ChatListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 750px;
  height: 630px;
  margin-top: 90px;
  align-items: center;
  margin-top: 50px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3rem rgba(0, 0, 0, 0.25), 0 2px 1px rgba(0, 0, 0, 0.22);
`;

const Title = styled.h1`
  margin-top: 45px;
  font-size: 32px;
`;

const ChatUserInfoWrapper = styled.div`
  margin-top: 50px;
  display: flex;
  width: 650px;
  justify-content: space-around;
  align-items: center;
  background-color: #74b9ff;
  color: white;
  font-weight: 600;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin: 0 auto;
`;

const UserItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const ChatUserList = () => {
  const { userNick, userMBTI } = useRecoilValue(userInfoState);
  const [isLogined, setIsLogined] = useRecoilState(isLogin);
  const [userList, setUserList] = useRecoilState(ChatUser);
  const navigate = useNavigate();
  const items = 6;
  const [page, setPage] = useState(1);
  const logoutProcess = () => {
    Swal.fire({
      icon: "error",
      title: "세션 만료",
      text: "다시 로그인이 필요합니다!",
    });
    setIsLogined((prev) => ({
      ...prev,
      login: !prev.login,
    }));
    removeCookie("loginToken");
    localStorage.clear();
  };
  useEffect(() => {
    const getChatUserList = async () => {
      try {
        const result = await loginedUserList();
        setUserList(result);
      } catch (e) {
        if (e.response.status === 401) {
          try {
            const logoutResult = await logoutRequest(userNick);

            if (logoutResult.resultCode === "success") {
              logoutProcess();
            }
          } catch (e) {}
          navigate("/login");
        }
      }
    };
    getChatUserList();
  }, [setUserList]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const chatUserList = userList.filter(
    (item) => item.nick !== userNick && item.mbti === userMBTI
  );
  return (
    <ChatListWrapper>
      <Title>대화 상대를 찾아보세요 💬</Title>
      <ChatUserInfoWrapper>
        <UserInfo>
          <h2>ID</h2>
        </UserInfo>
        <UserInfo>
          <h2>Login</h2>
        </UserInfo>
      </ChatUserInfoWrapper>
      <UserItemWrapper>
        {chatUserList
          ? chatUserList
              .slice(items * (page - 1), items * (page - 1) + items)
              .map((item) => <ChatUserItem key={Math.random()} {...item} />)
          : null}
      </UserItemWrapper>
      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={items}
          totalItemsCount={chatUserList.length}
          pageRangeDisplayed={
            chatUserList.length % items === 0
              ? chatUserList.length / items
              : chatUserList.length / items + 1
          }
          onChange={handlePageChange}
        />
      </PaginationBox>
    </ChatListWrapper>
  );
};

export default ChatUserList;
