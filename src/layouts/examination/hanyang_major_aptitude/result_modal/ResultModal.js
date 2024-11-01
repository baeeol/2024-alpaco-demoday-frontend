import { Modal, Box } from "@mui/material";
import { useState, useEffect } from "react";
import styles from "./ResultModal.module.css";
import HanyangMajorAptitudeResultRequest from "api/HanyangMajorAptitudeResultRequest";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "1.5rem 1.5rem 1.5rem 1.5rem",
  width: 400,
  bgcolor: "background.paper",
};

function ResultModal({ isOpen, onClose, justCheck }) {
  const [result, setResult] = useState({ A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 });

  useEffect(() => {
    async function loadResult() {
      const resultData = await HanyangMajorAptitudeResultRequest.findResult();
      setResult(resultData);
    }
    loadResult();
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {[
          { name: "공학, 기술적 성향", type: "A" },
          { name: "자연, 과학적 성향", type: "B" },
          { name: "공학, 기술적 성향", type: "C" },
          { name: "예술, 창의적 성향", type: "D" },
          { name: "사회과학, 글로벌 성향", type: "E" },
          { name: "경제, 효율지향적 성향", type: "F" },
        ].map((area) => {
          return (
            <div className={styles.area}>
              <div className={styles.name}>{area.name}</div>
              <div className={styles.level}>
                <div className={styles.levelBarContainer}>
                  <div
                    className={styles.levelBar}
                    style={{ width: `${result[area.type]}0%` }}
                  ></div>
                </div>
                <div className={styles.levelText}>{result[area.type]}/10</div>
              </div>
            </div>
          );
        })}
        <button
          className={styles.close}
          onClick={() => {
            onClose();
            if (!justCheck) {
              window.location.href = "/user/examination";
            }
          }}
        >
          닫기
        </button>
      </Box>
    </Modal>
  );
}

export default ResultModal;
