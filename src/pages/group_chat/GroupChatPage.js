import { Message, ChatBoard } from "components";
import { SendingTextarea } from "components";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSocket from "hook/useSocket";
import styles from "./GroupChatPage.module.css";
import GroupChatRequest from "api/GroupChatRequest";
import { getCookie } from "lib/Cookie";
import { BANNED_WORD } from "constant";

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
      const messageList = messageDataList.map((messageData) => {
        const { commenter, message } = messageData;
        const { id, name, interestPart, belongTo } = commenter;

        return {
          speakerIsMe: id === getCookie("access-token").id,
          data: {
            commenter: {
              name: name,
              interestPart: interestPart,
              belongTo: belongTo,
            },
            text: getCensoredMessage(message),
          },
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
          data: {
            commenter: {
              name: data.commenter.name,
              interestPart: data.commenter.interestPart,
              belongTo: data.commenter.belongTo,
            },
            text: getCensoredMessage(data.text),
          },
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
            <Message
              key={idx}
              isMyMessage={chat.speakerIsMe}
              commenter={`${chat.data.commenter.name} <${chat.data.commenter.belongTo} / ${chat.data.commenter.interestPart}>`}
            >
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
            const messageData = {
              commenter: {
                id: getCookie("access-token").id,
                name: getCookie("access-token").name,
                interestPart: getCookie("access-token").interestPart,
                belongTo: getCookie("access-token").belongTo,
              },
              text: getCensoredMessage(message),
            };

            sendMessageHandler(messageData, setChatList, socket, params.groupChatId);
            setMessage("");
          }}
          SendIcon={MapsUgcIcon}
          options={{ isAllowEmptyMessage: false }}
        />
      </div>
    </div>
  );
}

async function sendMessageHandler(message, setChatList, socket, groupChatId) {
  // 자신의 메시지 채팅창에 표시
  setChatList((prev) => {
    return [...prev].concat({ speakerIsMe: true, data: { ...message } });
  });

  // 다른 사람들에게 소켓으로 메시지 전송
  socket.emit("send", { ...message });

  // DB에 메시지 저장
  GroupChatRequest.addGroupChatMessage(groupChatId, message.text);
}

function getCensoredMessage(message) {
  let censoredMessage = message;

  BANNED_WORD.forEach((word) => {
    censoredMessage = censoredMessage.replace(word, "*".repeat(word.length));
  });

  return censoredMessage;
}

export default GroupChatPage;
