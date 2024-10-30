import styles from "./Message.module.css";

function Message({ isMyMessage, children, commenter }) {
  return (
    <div
      className={`${styles.messageContainer} ${
        isMyMessage ? styles.myMessageContainer : styles.otherMessageContainer
      }`}
    >
      <div className={styles.commenter}>{commenter}</div>
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
