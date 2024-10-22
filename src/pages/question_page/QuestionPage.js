import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./QuestionPage.module.css";
import { SendingTextarea } from "components";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import QuestionRequest from "api/QuestionRequest";

function QuestionPage() {
  const [question, setQuestion] = useState({ title: "", article: "", answerList: [] });
  const params = useParams();
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    async function loadQuestion() {
      const questionData = await QuestionRequest.findQuestion(params.questionId);
      setQuestion(questionData);
    }
    loadQuestion();
  }, []);

  return (
    <div className={styles.questionPageContainer}>
      <div className={styles.questionPage}>
        <div className={styles.QnA}>
          <div className={styles.questionContainer}>
            <div className={styles.textContainer}>
              <div className={`${styles.text} ${styles.content} ${styles.title}`}>
                {question.title}
              </div>
            </div>
            <div className={styles.textContainer}>
              <div className={`${styles.text} ${styles.content} ${styles.article}`}>
                {question.article}
              </div>
            </div>
          </div>
          <div className={styles.answerContainer}>
            {question.answerList.map((answer) => {
              return (
                <div className={styles.textContainer}>
                  <div className={`${styles.text} ${styles.answer}`}>{answer}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.answerInput}>
          <SendingTextarea
            maxRows={4}
            placeholder={"다른 사람에게 지식을 전해주세요!"}
            value={answer}
            onChangeHandler={setAnswer}
            onSendHandler={() => {
              addAnswer(params.questionId, { article: answer });
            }}
            SendIcon={MapsUgcIcon}
            options={{ isAllowEmptyMessage: false }}
          />
        </div>
      </div>
    </div>
  );
}

async function addAnswer(questionId, answerData) {
  await QuestionRequest.addAnswer(questionId, answerData);
  window.location.reload();
}

export default QuestionPage;
