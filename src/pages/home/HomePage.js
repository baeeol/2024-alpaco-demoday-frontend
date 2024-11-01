import { Message, ChatBoard } from "components";
import { SendingTextarea } from "components";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { useState, useEffect } from "react";
import ChatbotRequest from "api/ChatbotRequest";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

const MESSAGE_HISTORY_RANGE = 10;

function HomePage() {
  const [chatList, setChatList] = useState([]);
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage((prev) => {
      if (prev.startsWith("\n")) {
        return prev.replace("\n", "");
      }
      return prev;
    });
  }, [message]);

  return (
    <div className={styles.homePage}>
      <ChatBoard scrollDownTriger={chatList}>
        {chatList.map((chat, idx) => {
          return (
            <Message key={idx} isMyMessage={chat.speakerIsMe}>
              {chat.data.text}
            </Message>
          );
        })}
      </ChatBoard>
      <div className={styles.messageInput}>
        <div className={styles.messageSender}>
          <SendingTextarea
            maxRows={4}
            placeholder={"무엇을 알고 싶으신가요?"}
            value={message}
            onChangeHandler={setMessage}
            onSendHandler={() => {
              sendMessageHandler(
                message,
                setMessage,
                setChatList,
                messageHistory,
                setMessageHistory
              );
            }}
            SendIcon={MapsUgcIcon}
            options={{ isAllowEmptyMessage: false }}
          />
        </div>
        <div className={styles.examination}>
          <Link to="/user/examination" className={styles.examinationLink}>
            추가적인 검사를 통해 최적화된 답변을 받아보세요!
          </Link>
        </div>
      </div>
    </div>
  );
}

async function sendMessageHandler(
  message,
  setMessage,
  setChatList,
  messageHistory,
  setMessageHistory
) {
  // 자신의 메시지 채팅창에 표시
  setChatList((prev) => {
    return [...prev].concat({ type: "text", speakerIsMe: true, data: { text: message } });
  });
  setMessage("");

  // 챗봇의 메시지를 가져올때까지 ... / 가져온 후 메시지 표시
  setChatList((prev) => {
    return [...prev].concat({ type: "text", speakerIsMe: false, data: { text: "..." } });
  });
  const chatbotResponse = await ChatbotRequest.getChatbotResponse(
    message,
    messageHistory
  );
  setChatList((prev) => {
    return [...prev]
      .slice(0, -1)
      .concat({ type: "text", speakerIsMe: false, data: { text: chatbotResponse } });
  });

  // 메시지 히스토리 저장
  setMessageHistory((prev) => {
    return [...prev].slice(-(MESSAGE_HISTORY_RANGE - 1)).concat(message);
  });
}

export default HomePage;
