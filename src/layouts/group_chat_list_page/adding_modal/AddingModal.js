import { Modal, Box } from "@mui/material";
import { TextField } from "components";
import styles from "./AddingModal.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "400px",
  width: "90%",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
};

function AddingModal({ isOpen, onCloseHandler, value, setValue, onSubmitHandler }) {
  return (
    <Modal open={isOpen} onClose={onCloseHandler}>
      <Box sx={style}>
        <div className={styles.addingModal}>
          <div className={styles.title}>그룹채팅방 만들기</div>
          <div className={styles.form}>
            <TextField
              label="채팅방 이름"
              variant="outlined"
              value={value.name}
              setValue={setValue.setName}
            />
            <TextField
              label="태그"
              variant="outlined"
              value={value.tag}
              setValue={setValue.setTag}
            />
          </div>
          <div className={styles.actionButtonContainer}>
            <button
              className={`${styles.actionButton} ${styles.cancelButton}`}
              onClick={onCloseHandler}
            >
              취소
            </button>
            <button
              className={`${styles.actionButton} ${styles.submitButton}`}
              onClick={onSubmitHandler}
            >
              확인
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default AddingModal;
