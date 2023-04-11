import styled from "styled-components";
import BoardList from "../components/BoardList";
import { useRecoilValue } from "recoil";
import { isLogin } from "../recoil/loginStatus";

const Board = () => {
  const isLogined = useRecoilValue(isLogin);
  return <>{isLogined.login ? <BoardList /> : null}</>;
};

export default Board;
