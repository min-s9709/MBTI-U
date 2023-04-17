import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../recoil/userAtom";
import { useEffect } from "react";
import { isLogin } from "../recoil/loginStatus";
import { loginRequest } from "../lib/api";
import { useState } from "react";

const Wrapper = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 40px;
  background-color: #ecf0f1;
  opacity: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 120px;
  box-shadow: 0 2px 3rem rgba(0, 0, 0, 0.25), 0 2px 1px rgba(0, 0, 0, 0.22);
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-top: 25px;
`;

const Input = styled.input`
  margin-top: 40px;
  margin-bottom: 5px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.9rem 0.9rem;
  width: 100%;
`;

const Button = styled.button`
  width: 150px;
  cursor: pointer;
  background-color: #2980b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  margin-top: 18px;
  font-size: 15px;
  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 35px;
  p {
    margin-bottom: 15px;
    font-size: 15px;
  }
`;

const LoginError = styled.span`
  color: red;
  font-size: 12px;
`;

const UserLogin = () => {
  const [userData, setUserData] = useRecoilState(userInfoState);
  const [isLogined, setIsLogined] = useRecoilState(isLogin);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const onValid = async (data) => {
    const { userNick, userPassword } = data;
    try {
      let loginResult = await loginRequest(userNick, userPassword);
      if (loginResult.resultCode === "success") {
        setIsLogined((prev) => ({
          ...prev,
          login: !prev.login,
        }));
        setUserData((prev) => ({
          ...prev,
          userNick,
          userPassword,
        }));
        navigate("/");
      }
    } catch (e) {
      if (e.response.data.resultCode === "NOT_FOUND") {
        setErrorMessage("등록되어 있지 않은 회원입니다.");
      } else if (e.response.data.resultCode === "INVALID_PASSWORD") {
        setErrorMessage("Password가 틀립니다.");
      }
      setValue("userNick", "");
      setValue("userPassword", "");
    }
  };
  useEffect(() => {
    if (isLogined.login === true) {
      navigate("/");
    }
  }, [isLogined, navigate]);
  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("userNick", { required: "ID를 꼭 입력해주세요..." })}
          placeholder="ID"
        />
        {errors.userNick && <LoginError>{errors.userNick.message}</LoginError>}
        <Input
          {...register("userPassword", {
            required: "Password를 꼭 입력해주세요...",
          })}
          placeholder="Password"
          type="password"
        />
        {errors.userPassword && (
          <LoginError>{errors.userPassword.message}</LoginError>
        )}
        <Button>Log In</Button>
      </Form>
      <Footer>
        <p>회원가입이 필요하신가요?</p>
        <LoginError>{errorMessage}</LoginError>
        <Button>
          <Link to="/register">Sign Up</Link>
        </Button>
      </Footer>
    </Wrapper>
  );
};

export default UserLogin;
