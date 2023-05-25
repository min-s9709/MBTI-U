import SockJS from "sockjs-client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../recoil/userAtom";

const ChatWrapper = styled.div`
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 70px;
  position: relative;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 2px 3rem rgba(0, 0, 0, 0.25), 0 2px 1px rgba(0, 0, 0, 0.22);
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-bottom: 20px;
  background-color: #74b9ff;
`;

const UserName = styled.h1`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: white;
  font-size: 25px;
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  &.me {
    justify-content: flex-end;
  }
`;

const UserTitle = styled.span`
  font-weight: bold;
  margin-right: 5px;
  margin-bottom: 22px;
`;

const MessageInfo = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 10px;
  color: white;
  font-weight: bold;
  &.me {
    background-color: #e17055;
    border-top-right-radius: 0;
  }
  &.patner {
    background-color: #00b894;
    border-top-left-radius: 0;
  }
`;

const MessageContent = styled.span`
  margin-right: 10px;
`;

const TimeStamp = styled.span`
  font-size: 10px;
  margin-left: 10px;
  margin-top: 15px;
`;

const SendContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  background-color: #dfe6e9;
`;

const SendButton = styled.button`
  background-color: #74b9ff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
`;

const ExitButton = styled.button`
  position: absolute;
  right: 40px;
  bottom: 40px;
  width: 150px;
  cursor: pointer;
  background-color: #2980b9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  margin-top: 12px;
  font-size: 15px;
  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;

const ChatComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useParams();
  const { userNick } = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  useEffect(() => {
    // SockJS 연결
    const sock = new SockJS("http://localhost:9991/chat");
    setSocket(sock);

    // 연결 해제 시
    return () => {
      sock.close();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // 메시지 수신 이벤트 핸들러 등록
      socket.onmessage = (event) => {
        const message = event.data;
        setMessages((prevMessages) => [...prevMessages, message]);
      };
    }
  }, [socket]);
  // 메시지 전송
  const sendMessage = () => {
    if (socket && input) {
      socket.send(`${userNick}:${input}`);
      setInput("");
    }
  };

  const exitChatRoom = () => {
    navigate("/chat");
  };
  return (
    <>
      <ChatWrapper>
        <ChatHeader>
          <UserName>
            <FontAwesomeIcon icon={faUser} /> {user}
          </UserName>
        </ChatHeader>
        <div>
          {messages.map((message, index) => (
            <MessageWrapper
              className={message.split(":")[0] === userNick ? "me" : "patner"}
              key={index}
            >
              <UserTitle>
                {message.split(":")[0] === userNick
                  ? null
                  : message.split(":")[0]}
              </UserTitle>
              <MessageInfo
                className={message.split(":")[0] === userNick ? "me" : "patner"}
              >
                <MessageContent>{message.split(":")[1]}</MessageContent>
              </MessageInfo>
              <TimeStamp>{new Date().toLocaleDateString()}</TimeStamp>
            </MessageWrapper>
          ))}
        </div>
        <SendContainer>
          <MessageInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메세지를 입력해주세요..."
          />
          <SendButton onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </SendButton>
        </SendContainer>
      </ChatWrapper>
      <ExitButton onClick={exitChatRoom}>채팅방 나가기</ExitButton>
    </>
  );
};

export default ChatComponent;
