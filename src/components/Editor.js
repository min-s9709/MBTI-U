import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { boardWriteRequest, logoutRequest } from "../lib/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/userAtom";
import Swal from "sweetalert2";
import { isLogin } from "../recoil/loginStatus";
import { removeCookie } from "../util/cookie";

const EditorWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
  margin-top: 70px;
  padding: 10px;
`;

const TitleInput = styled.input`
  font-size: 28px;
  outline: none;
  border: none;
  border-bottom: 2px solid lightgray;
  border-radius: 12px;
  margin-bottom: 15px;
  padding: 5px 10px;
  width: 100%;
`;
const QuillWrapper = styled.div`
  height: 500px;
  background-color: white;
  .ql-editor {
    padding: 5px;
    height: 460px;
    font-size: 24px;
    line-height: 1.5;
  }
`;
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
  margin-top: 10px;
  margin-right: 10px;
  font-size: 12px;
  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;
const Editor = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const userData = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const [isLogined, setIsLogined] = useRecoilState(isLogin);
  const { userNick, userMBTI } = userData;

  const logoutProcess = () => {
    Swal.fire({
      icon: "error",
      title: "세션 만료",
      text: "다시 로그인이 필요합니다!",
    });
    setIsLogined((prev) => ({
      ...prev,
      login: !prev.login,
    }));
    removeCookie("loginToken");
    localStorage.clear();
  };

  const handleContent = (value) => {
    setBody(value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };
  const onClickPost = async () => {
    const newBoardItem = {
      title,
      body,
      regdate: new Date().toLocaleDateString(),
      userNick,
      userMBTI,
    };
    try {
      const result = await boardWriteRequest(newBoardItem);
      if (result.resultCode === "success") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "게시글 작성 완료!",
        });
        navigate("/board");
      }
    } catch (e) {
      if (e.response.status === 401) {
        try {
          const logoutResult = await logoutRequest(userNick);
          if (logoutResult.resultCode === "success") {
            logoutProcess();
          }
          navigate("/login");
        } catch (e) {}
      } else {
        Swal.fire({
          icon: "error",
          title: "Fail!",
          text: "게시글 작성 실패",
        });
        setTitle("");
        setBody("");
      }
    }
  };

  const onClickCancel = () => {
    navigate("/board");
  };

  return (
    <>
      <EditorWrapper>
        <TitleInput
          value={title}
          onChange={handleTitle}
          placeholder="제목을 작성하세요..."
        />
        <QuillWrapper>
          <ReactQuill
            value={body}
            onChange={(content, delta, source, editor) =>
              handleContent(editor.getHTML())
            }
            theme="snow"
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block", "link", "image"],
              ],
            }}
            placeholder="내용을 입력하세요..."
          />
        </QuillWrapper>
      </EditorWrapper>
      <WriteButtonWrapper>
        <Btn onClick={onClickPost}>등록하기</Btn>
        <Btn onClick={onClickCancel}>취소하기</Btn>
      </WriteButtonWrapper>
    </>
  );
};

export default Editor;
