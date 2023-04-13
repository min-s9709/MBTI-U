import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

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
const Editor = () => {
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const handleContent = (value) => {
    setBody(value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <EditorWrapper>
      <TitleInput onChange={handleTitle} placeholder="제목을 작성하세요..." />
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
      <div>
        <h1>{title}</h1>
        <h2 dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </EditorWrapper>
  );
};

export default Editor;
