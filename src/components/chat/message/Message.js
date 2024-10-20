import styles from "./Message.module.css";

function Message({ isMyMessage, children }) {
  return (
    <div
      className={`${styles.messageContainer} ${
        isMyMessage ? styles.myMessageContainer : styles.otherMessageContainer
      }`}
    >
      <div
        className={`${styles.message} ${
          isMyMessage ? styles.myMessage : styles.otherMessage
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default Message;
