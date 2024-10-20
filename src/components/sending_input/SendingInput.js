import styles from "./SendingInput.module.css";

function SendingInput({
  placeholder,
  value,
  onChangeHandler,
  onSendHandler,
  SendIcon,
  options,
  style,
}) {
  return (
    <div className={styles.messageInput}>
      <input
        placeholder={placeholder}
        className={styles.input}
        value={value}
        onChange={onChangeHandler}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (options.isAllowEmptyMessage) {
              onSendHandler();
            } else {
              if (!isEmpty(value)) {
                onSendHandler();
              }
            }
          }
        }}
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

export default SendingInput;
