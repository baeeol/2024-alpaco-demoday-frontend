import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import ChecklistIcon from "@mui/icons-material/Checklist";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import styles from "./ExaminationSummary.module.css";

function ExaminationSummary({
  name,
  description,
  requiredTime,
  questionAmount,
  isDone,
  link,
}) {
  return (
    <Link to={link} className={styles.examinationSummary}>
      <div className={styles.article}>
        <div className={styles.name}>{name}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.infoTxt}>
          <AlarmOnIcon className={styles.icon} />
          {requiredTime}
        </div>
        <div className={styles.infoTxt}>
          <ChecklistIcon className={styles.icon} />
          {questionAmount}
        </div>
        <div className={styles.infoTxt}>
          {isDone ? (
            <>
              <DoneIcon className={styles.icon} />
              완료
            </>
          ) : (
            <>
              <CloseIcon className={styles.icon} />
              미완료
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ExaminationSummary;
