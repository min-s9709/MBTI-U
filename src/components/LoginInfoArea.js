import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userInfoState } from "../recoil/userAtom";
import { isLogin } from "../recoil/loginStatus";
import { removeCookie } from "../util/cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { logoutRequest } from "../lib/api";
const Wrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
  margin-top: 12px;
  top: 55px;
  right: 0;
`;

const Span = styled.span`
  margin-left: 3px;
  margin-right: 10px;
  font-size: 15px;
  font-weight: 550;
  color: #2c3e50;
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
  const navigate = useNavigate();

  const userLogout = async () => {
    try {
      const logoutResult = await logoutRequest(userNick);
      if (logoutResult.resultCode === "success") {
        setIsLogined((prev) => ({
          ...prev,
          login: !prev.login,
        }));

        setUserData((prev) => ({
          ...prev,
          userNick: "",
          userMBTI: "",
        }));
        removeCookie("loginToken", { path: "/" });
        localStorage.clear();
        navigate("/");
      }
    } catch (e) {}
  };
  return (
    <Wrapper>
      {isLogined.login ? (
        <>
          <FontAwesomeIcon icon={faUser} />
          <Span>{userNick}님 환영합니다😃</Span>
          <Button onClick={userLogout}>로그아웃</Button>
        </>
      ) : null}
    </Wrapper>
  );
};

export default LoginInfoArea;
