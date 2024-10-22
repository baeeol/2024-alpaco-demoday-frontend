import { Link } from "react-router-dom";
import styles from "./QuestionSummary.module.css";

function QuestionSummary({ id, title, article, amountOfAnswers }) {
  return (
    <Link to={`/question/${id}`} className={styles.questionSummary}>
      <div className={styles.contentContainer}>
        <div className={styles.title}>{title}</div>
        <div className={styles.article}>{article}</div>
      </div>
      <div className={styles.amountOfAnswers}>[{amountOfAnswers}]</div>
    </Link>
  );
}

export default QuestionSummary;
