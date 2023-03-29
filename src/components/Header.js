import styled from "styled-components";
import { NavLink } from "react-router-dom";

const categories = [
  {
    name: "home",
    text: "홈",
  },
  {
    name: "movie",
    text: "영화 추천",
  },
  {
    name: "board",
    text: "MBTI 게시판",
  },
  {
    name: "chat",
    text: "채팅하기",
  },
  {
    name: "register",
    text: "회원가입",
  },
  {
    name: "login",
    text: "로그인",
  },
];

const CategoriesBlock = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 1rem;
  width: 100%;
  background-color: #3498db;
`;

const Category = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3rem;
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: white;
  padding-bottom: 0.25rem;
  &:hover {
    color: #495057;
  }
  &.active {
    font-weight: 600;
    border-bottom: 2px solid #ecf0f1;
    color: #ecf0f1;
    &:hover {
      color: #3bc9db;
    }
  }
  & + & {
    margin-left: 2rem;
  }
`;

const Header = () => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          className={({ isActive }) => (isActive ? "active" : undefined)}
          to={c.name === "home" ? "/" : `/${c.name}`}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Header;
