import PageTemplate from "components/page/PageTemplate";
import { Message, ChatBoard } from "components";
import { SendingTextarea } from "components";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import Navigation from "pages/semantic/navigation/Navigation";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import useSocket from "hook/useSocket";
import styles from "./GroupChatPage.module.css";

function GroupChatPage() {
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const { socket } = useSocket("group-chat", useParams().groupChatId);

  useEffect(() => {
    setMessage((prev) => {
      if (prev.startsWith("\n")) {
        return prev.replace("\n", "");
      }
      return prev;
    });
  }, [message]);

  useEffect(() => {
    if (!socket) return;
    const socketEvent = (data) => {
      setChatList((prev) => {
        return [...prev].concat({
          type: "text",
          speakerIsMe: false,
          data: { text: data.message },
        });
      });
    };
    socket.on("receive", socketEvent);
    return () => {
      socket.off("receive", socketEvent);
    };
  }, [socket]);

  return (
    <PageTemplate isFullScreen={true}>
      <Navigation>
        <div className={styles.gotoGroupChatContainer}>
          <Link to="/group-chat" className={styles.gotoGroupChatNav}>
            <ArrowBackIosNewIcon className={styles.gotoGroupChatIcon} />
          </Link>
          <div className={styles.groupChatName}>{searchParams.get("name")}</div>
        </div>
      </Navigation>
      <div className={styles.groupChatPage}>
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
            maxRows={10}
            placeholder={"멋진 대화를 시작해보세요!"}
            value={message}
            onChangeHandler={setMessage}
            onSendHandler={() => {
              sendMessageHandler(message, setMessage, setChatList, socket);
            }}
            SendIcon={MapsUgcIcon}
            options={{ isAllowEmptyMessage: false }}
          />
        </div>
      </div>
    </PageTemplate>
  );
}

async function sendMessageHandler(message, setMessage, setChatList, socket) {
  // 자신의 메시지 채팅창에 표시
  setChatList((prev) => {
    return [...prev].concat({ type: "text", speakerIsMe: true, data: { text: message } });
  });
  setMessage("");

  // 다른 사람들에게 소켓으로 메시지 전송
  socket.emit("send", { message: message });
}

export default GroupChatPage;
