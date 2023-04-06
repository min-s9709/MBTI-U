import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfoState } from "../recoil/userAtom";
import { isLogin } from "../recoil/loginStatus";

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
  const user = useRecoilValue(userInfoState);
  const [isLogined, setIsLogined] = useRecoilState(isLogin);
  const { userNick } = user;

  const userLogout = () => {
    setIsLogined((prev) => ({
      ...prev,
      login: !prev.login,
    }));
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
