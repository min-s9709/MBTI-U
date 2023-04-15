import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerRequest } from "../lib/api";

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
  margin-top: 20px;
`;

const Input = styled.input`
  margin-top: 20px;
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
  margin-top: 25px;
  p {
    margin-bottom: 5px;
    font-size: 15px;
  }
  button {
    width: 145%;
  }
`;

const UserRegister = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onValid = async (data) => {
    try {
      let result = await registerRequest(data);
      if (result.resultCode === "success") {
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("userRegisterNick", {
            required: "ID를 꼭 입력해주세요...",
          })}
          placeholder="ID"
        />
        <Input
          {...register("userRegisterPassword", {
            required: "Password를 한번 더 입력해주세요...",
          })}
          placeholder="Password"
          type="password"
        />
        <Input
          {...register("userPasswordConfirm", {
            required: "Password를 꼭 입력해주세요...",
          })}
          placeholder="Password Confirm"
          type="password"
        />
        <Input
          {...register("userMBTI", {
            required: "자신의 MBTI를 꼭 입력해주세요...",
          })}
          placeholder="Write Your MBTI"
        />
        <Button>Sign Up</Button>
      </Form>
      <Footer>
        <p>이미 회원이신가요?</p>
        <Button>
          <Link to="/login">Sign In</Link>
        </Button>
      </Footer>
    </Wrapper>
  );
};

export default UserRegister;
