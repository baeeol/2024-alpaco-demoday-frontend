import PageTemplate from "components/page/PageTemplate";
import { Message, ChatBoard } from "components";
import { SendingTextarea } from "components";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import Navigation from "pages/semantic/navigation/Navigation";
import { useState, useEffect } from "react";
import ChatbotRequest from "api/ChatbotRequest";
import { Link } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
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
    <PageTemplate isFullScreen={true}>
      <Navigation>
        <div className={styles.gotoGroupChatContainer}>
          <Link to="/group-chat" className={styles.gotoGroupChatNav}>
            <ChatIcon className={styles.gotoGroupChatIcon} />
          </Link>
        </div>
      </Navigation>
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
          <SendingTextarea
            maxRows={4}
            placeholder={"궁금하신 것이 있으신가요?"}
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
      </div>
    </PageTemplate>
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

  console.log(messageHistory);

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
