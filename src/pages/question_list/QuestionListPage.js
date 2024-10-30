import { SendingInput } from "components";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import QuestionRequest from "api/QuestionRequest";
import { QuestionSummary } from "layouts/question_list_page";
import styles from "./QuestionListPage.module.css";

const sendingInputStyle = {
  button: { background: "none", padding: "0.1rem" },
  sendIcon: { color: "#f95454", fontSize: "2rem" },
};

function QuestionListPage() {
  const [questionList, setQuestionList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    loadQuestionList(searchKeyword, setQuestionList);
  }, [searchParams]);

  return (
    <div className={styles.questionListPage}>
      <SendingInput
        placeholder={"궁금하신 것이 있나요?"}
        SendIcon={SearchIcon}
        style={sendingInputStyle}
        value={searchKeyword}
        onChangeHandler={(e) => {
          setSearchKeyword(e.target.value);
        }}
        onSendHandler={() => {
          setSearchParams({ search: searchKeyword });
        }}
        options={{ isAllowEmptyMessage: true }}
      />
      <div className={styles.addQuestionContainer}>
        <Link to="/question/write" className={styles.addQuestion}>
          질문하기
        </Link>
      </div>
      <div className={styles.QuestionSummaryContainer}>
        <div className={styles.QuestionSummaryList}>
          {questionList.map((question, idx) => {
            return <QuestionSummary key={idx} question={question} />;
          })}
        </div>
      </div>
    </div>
  );
}

async function loadQuestionList(searchKeyword, setGroupChatList) {
  const groupChatList = await QuestionRequest.findQuestionSummary(searchKeyword);
  setGroupChatList((prev) => {
    return groupChatList;
  });
}

export default QuestionListPage;
