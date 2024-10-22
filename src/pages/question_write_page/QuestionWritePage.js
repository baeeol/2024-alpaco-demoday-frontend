import { useState } from "react";
import QuestionRequest from "api/QuestionRequest";
import styles from "./QuestionWritePage.module.css";

function QuestionWritePage() {
  const [questionData, setQuestionData] = useState({ title: "", article: "" });

  const setTitle = (v) => {
    setQuestionData((prev) => {
      return { ...prev, title: v };
    });
  };
  const setArticle = (v) => {
    setQuestionData((prev) => {
      return { ...prev, article: v };
    });
  };

  return (
    <div className={styles.questionWritePageContainer}>
      <div className={styles.questionWritePage}>
        <input
          value={questionData.title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={`${styles.titleInput} ${styles.inputForm}`}
          placeholder="질문 제목을 적어주세요"
        />
        <textarea
          value={questionData.article}
          onChange={(e) => {
            setArticle(e.target.value);
          }}
          className={`${styles.articleTextField} ${styles.inputForm}`}
          placeholder="질문 내용을 적어주세요"
        ></textarea>
        <button
          className={styles.submitButton}
          onClick={() => {
            addQuestion(questionData);
          }}
        >
          질문 등록하기
        </button>
      </div>
    </div>
  );
}

async function addQuestion(questionData) {
  if (!questionData.title || !questionData.article) {
    alert("모두 작성하여 주십시오.");
  }

  const questionId = await QuestionRequest.addQuestion(questionData);
  window.location.href = `/question/${questionId}`;
}

export default QuestionWritePage;
