import { Link } from "react-router-dom";
import styles from "./QuestionSummary.module.css";

function QuestionSummary({ question }) {
  return (
    <Link to={`/question/${question.id}`} className={styles.questionSummary}>
      <div className={styles.contentContainer}>
        <div className={styles.title}>{question.title}</div>
        <div className={styles.article}>{question.article}</div>
        <div className={styles.questioner}>
          질문자 : {question.questioner.name} {question.questioner.interestPart} / 댓글 수
          : {question.amountOfAnswers}
        </div>
      </div>
    </Link>
  );
}

export default QuestionSummary;
