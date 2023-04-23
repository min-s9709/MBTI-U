import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userInfoState } from "../recoil/userAtom";
import { isLogin } from "../recoil/loginStatus";
import { getCookie, removeCookie } from "../util/cookie";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5px;
  top: 55px;
  right: 0;
`;

const Span = styled.span`
  margin-right: 10px;
`;

const Button = styled.button`
  margin-right: 10px;
  cursor: pointer;
  background-color: #2980b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;

const LoginInfoArea = () => {
  const [userData, setUserData] = useRecoilState(userInfoState);
  const [isLogined, setIsLogined] = useRecoilState(isLogin);
  const { userNick } = userData;

  const userLogout = () => {
    setIsLogined((prev) => ({
      ...prev,
      login: !prev.login,
    }));

    setUserData((prev) => ({
      ...prev,
      userNick: "",
      userPassword: "",
    }));
    removeCookie("loginToken", { path: "/" });
    localStorage.clear();
  };
  return (
    <Wrapper>
      {isLogined.login ? (
        <>
          <Span>{userNick}님 환영합니다😃</Span>
          <Button onClick={userLogout}>로그아웃</Button>
        </>
      ) : null}
    </Wrapper>
  );
};

export default LoginInfoArea;
