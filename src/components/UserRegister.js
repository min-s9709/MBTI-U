import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../lib/api";
import { useState } from "react";

const Wrapper = styled.div`
  width: 500px;
  height: 610px;
  border-radius: 40px;
  background-color: #ecf0f1;
  opacity: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 85px;
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
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  padding: 0.9rem 0.9rem;
  width: 200px;
`;

const Button = styled.button`
  width: 150px;
  cursor: pointer;
  background-color: #2980b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  margin-top: 15px;
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
  margin-top: 30px;
  p {
    margin-bottom: 5px;
    font-size: 15px;
  }
`;

const RegisterError = styled.span`
  color: red;
  font-size: 12px;
`;

const UserRegister = () => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = useForm({ mode: "onChange" });
  const [duplicateMessage, setDuplicateMessage] = useState("");
  const navigate = useNavigate();
  const onValid = async (data) => {
    try {
      let result = await registerRequest(data);
      if (result.resultCode === "success") {
        navigate("/login");
        console.log("회원가입 완료");
      }
    } catch (e) {
      if (e.response.data.resultCode === "DUPLICATE_RESOURCE") {
        setDuplicateMessage("이미 가입된 회원입니다.");
        setValue("userRegisterNick", "");
        setValue("userRegisterPassword", "");
        setValue("userPasswordConfirm", "");
        setValue("userMBTI", "");
      }
    }
  };

  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("userRegisterNick", {
            required: "ID를 꼭 입력해주세요.",
          })}
          placeholder="ID"
        />
        {errors.userRegisterNick && (
          <RegisterError>{errors.userRegisterNick.message}</RegisterError>
        )}
        <Input
          {...register("userRegisterPassword", {
            required: "Password를 꼭 입력해주세요.",
            minLength: {
              value: 8,
              message: "최소 8자 이상 입력해주세요.",
            },
          })}
          placeholder="Password"
          type="password"
        />
        {errors.userRegisterPassword && (
          <RegisterError>{errors.userRegisterPassword.message}</RegisterError>
        )}
        <Input
          {...register("userPasswordConfirm", {
            required: "Password 확인을 위해 꼭 입력해주세요.",
            validate: (value) => {
              const { userRegisterPassword } = getValues();
              return (
                userRegisterPassword === value ||
                "Password가 일치하지 않습니다."
              );
            },
          })}
          placeholder="Password Confirm"
          type="password"
        />
        {errors.userPasswordConfirm && (
          <RegisterError>{errors.userPasswordConfirm.message}</RegisterError>
        )}
        <Input
          {...register("userMBTI", {
            required: "자신의 MBTI를 꼭 입력해주세요...",
          })}
          placeholder="Write Your MBTI"
        />
        {errors.userMBTI && (
          <RegisterError>{errors.userMBTI.message}</RegisterError>
        )}
        <Button>Sign Up</Button>
      </Form>
      <Footer>
        <p>이미 회원이신가요?</p>
        <RegisterError>{duplicateMessage}</RegisterError>
        <Button>
          <Link to="/login">Sign In</Link>
        </Button>
      </Footer>
    </Wrapper>
  );
};

export default UserRegister;
