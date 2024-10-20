import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import styles from "./SendingTextarea.module.css";

function SendingTextarea({
  placeholder,
  value,
  onChangeHandler,
  onSendHandler,
  SendIcon,
  options,
  style,
  maxRows,
}) {
  const onKeyDownHandler = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    } else if (e.key === "Enter") {
      if (options.isAllowEmptyMessage) {
        onSendHandler();
      } else {
        if (!isEmpty(value)) {
          onSendHandler();
        }
      }
    }
  };

  return (
    <div className={styles.messageInput}>
      <TextareaAutosize
        maxRows={maxRows || 1}
        rows={1}
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={(e) => {
          onChangeHandler(e.target.value);
        }}
        onKeyDown={onKeyDownHandler}
        style={style ? style.input : null}
      />
      <button
        className={styles.sendButton}
        onClick={onSendHandler}
        style={style ? style.button : null}
      >
        <SendIcon
          className={styles.sendButtonIcon}
          style={style ? style.sendIcon : null}
        />
      </button>
    </div>
  );
}

const isEmpty = (str) => {
  if (str.replace(/(^\s*)|(\s*$)/gi, "")) {
    return false;
  }
  return true;
};

export default SendingTextarea;
