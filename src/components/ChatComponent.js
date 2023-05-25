import SockJS from "sockjs-client";
import { useEffect, useState } from "react";

const ChatComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
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
      socket.send(input);
      setInput("");
    }
  };
  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
