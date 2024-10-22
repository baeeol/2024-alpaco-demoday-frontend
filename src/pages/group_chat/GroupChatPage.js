import { Message, ChatBoard } from "components";
import { SendingTextarea } from "components";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSocket from "hook/useSocket";
import styles from "./GroupChatPage.module.css";
import GroupChatRequest from "api/GroupChatRequest";

function GroupChatPage() {
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState("");
  const params = useParams();
  const { socket } = useSocket("group-chat", params.groupChatId);

  useEffect(() => {
    async function loadChatList() {
      const messageDataList = await GroupChatRequest.findGroupChatMessage(
        params.groupChatId
      );
      console.log(messageDataList);
      const messageList = messageDataList.map((messageData) => {
        return {
          speakerIsMe: false,
          data: { text: messageData },
        };
      });
      setChatList((prev) => {
        return messageList;
      });
    }
    loadChatList();
  }, []);

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
            sendMessageHandler(
              message,
              setMessage,
              setChatList,
              socket,
              params.groupChatId
            );
          }}
          SendIcon={MapsUgcIcon}
          options={{ isAllowEmptyMessage: false }}
        />
      </div>
    </div>
  );
}

async function sendMessageHandler(message, setMessage, setChatList, socket, groupChatId) {
  // 자신의 메시지 채팅창에 표시
  setChatList((prev) => {
    return [...prev].concat({ speakerIsMe: true, data: { text: message } });
  });
  setMessage("");

  // 다른 사람들에게 소켓으로 메시지 전송
  socket.emit("send", { message: message });

  // DB에 메시지 저장
  GroupChatRequest.addGroupChatMessage(groupChatId, message);
}

export default GroupChatPage;
