import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userInfoState } from "../recoil/userAtom";
import { useEffect } from "react";
import { useState } from "react";
import { isLogin } from "../recoil/loginStatus";

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
  margin-top: 50px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.9rem 0.9rem;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
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

const UserLogin = () => {
  const [userData, setUserData] = useRecoilState(userInfoState);
  const [isLogined, setIsLogined] = useRecoilState(isLogin);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onValid = async (data) => {
    const { userNick, userPassword } = data;
    setUserData((prev) => ({
      ...prev,
      userNick,
      userPassword,
    }));
    setIsLogined((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLogined", JSON.stringify(isLogined));
    if (isLogined) {
      navigate("/");
    }
  }, [userData, navigate, isLogined]);
  return (
    <Wrapper>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("userNick", { required: "ID를 꼭 입력해주세요..." })}
          placeholder="ID"
        />
        <Input
          {...register("userPassword", {
            required: "Password를 꼭 입력해주세요...",
          })}
          placeholder="Password"
          type="password"
        />
        <Button>Log In</Button>
      </Form>
      <Footer>
        <p>회원가입이 필요하신가요?</p>
        <Button>
          <Link to="/register">Sign Up</Link>
        </Button>
      </Footer>
    </Wrapper>
  );
};

export default UserLogin;
