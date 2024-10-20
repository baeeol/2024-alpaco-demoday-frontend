import { useEffect, useRef } from "react";
import styles from "./ChatBoard.module.css";

function ChatBoard({ children, scrollDownTriger }) {
  const chatBoardRef = useRef();

  useEffect(() => {
    chatBoardRef.current.scrollTo(0, chatBoardRef.current.scrollHeight);
  }, [scrollDownTriger]);

  return (
    <div className={styles.chatBoardContainer} ref={chatBoardRef}>
      <div className={styles.chatBoard}>{children}</div>
    </div>
  );
}

export default ChatBoard;
