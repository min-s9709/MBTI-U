import styled from "styled-components";
import { Quill } from "react-quill";
import "quill/dist/quill.bubble.css";
import { useEffect, useRef } from "react";

const EditorWrapper = styled.div`
  width: 800px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 10px;
`;

const TitleInput = styled.input`
  font-size: 36px;
  outline: none;
  border: none;
  border-bottom: 2px solid lightgray;
  border-radius: 20px;
  margin-bottom: 15px;
  padding: 5px 10px;
  width: 100%;
`;

const QuillWrapper = styled.div`
  height: 350px;
  div {
    background-color: white;
    font-size: 15px;
    border-radius: 20px;
  }
`;
const Editor = () => {
  const quillElement = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble",
      placeholder: "내용을 작성하세요...",
      modules: {
        toolbar: [
          [{ header: "1" }, { header: "2" }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
      },
    });
  }, []);
  return (
    <EditorWrapper>
      <TitleInput placeholder="제목을 작성하세요..." />
      <QuillWrapper>
        <div ref={quillElement}></div>
      </QuillWrapper>
    </EditorWrapper>
  );
};

export default Editor;
