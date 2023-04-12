import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const WriteButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button`
  width: 100px;
  cursor: pointer;
  background-color: #2980b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  margin-top: 20px;
  margin-right: 10px;
  font-size: 12px;
  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;

const PostWriteButton = () => {
  const navigate = useNavigate();

  const onClickPost = () => {
    navigate("/board");
  };

  const onClickCancel = () => {
    navigate("/board");
  };

  return (
    <WriteButtonWrapper>
      <Btn onClick={onClickPost}>등록하기</Btn>
      <Btn onClick={onClickCancel}>취소하기</Btn>
    </WriteButtonWrapper>
  );
};

export default PostWriteButton;
