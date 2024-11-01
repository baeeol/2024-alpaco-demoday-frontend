import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import QuestionList from "./QuestionList";
import { useState, useEffect } from "react";
import HanyangMajorAptitudeResultRequest from "api/HanyangMajorAptitudeResultRequest";
import { ResultModal } from "layouts/examination/hanyang_major_aptitude";
import styles from "./HanyangMajorAptitude.module.css";

function HanyangMajorAptitude() {
  const [selectedQuestionList, setSelectedQuestionList] = useState(
    new Array(60).fill("")
  );
  const [isResultModalOpen, setIsResultModalOpen] = useState({
    show: false,
    justCheck: false,
  });
  const [isDone, setIsDone] = useState(false);

  const onCheckHandler = (e, idx) => {
    setSelectedQuestionList((prev) => {
      let curr = [...prev];
      curr[idx] = e.target.checked ? e.target.value : "";
      return curr;
    });
  };

  // useEffect(() => {
  //   setIsDoneExamination(setIsDone);
  // }, []);

  return (
    <>
      <ResultModal
        isOpen={isResultModalOpen.show}
        onClose={() => {
          setIsResultModalOpen({ show: false, justCheck: false });
        }}
        justCheck={isResultModalOpen.justCheck}
      />
      <div className={styles.hanyangMajorAptitudeContainer}>
        <div className={styles.title}>
          <div className={styles.name}>한양대 전공적합성 검사</div>
          <div className={styles.description}>
            자신의 성향과 일치한다고 생각되는 형용사를 모두 체크해주세요.
          </div>
        </div>
        <div className={styles.questionList}>
          <FormGroup
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              rowGap: 1.9,
              columnGap: 2,
              width: "100%",
              padding: "0rem 0.6rem 0rem 1.8rem",
            }}
          >
            {QuestionList.map((question, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  value={question.value}
                  checked={selectedQuestionList[idx] !== ""}
                  onChange={(e) => {
                    onCheckHandler(e, idx);
                  }}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "1.2rem",
                      color: "#272727",
                    },
                  }}
                  control={<Checkbox />}
                  label={question.name}
                />
              );
            })}
          </FormGroup>
        </div>
        <button
          className={styles.submit}
          onClick={() => {
            try {
              updateExaminationResult(selectedQuestionList).then((success) => {
                if (success) {
                  setIsResultModalOpen((prev) => {
                    return { ...prev, show: true };
                  });
                }
              });
            } catch (e) {}
          }}
        >
          제출하기
        </button>
        <button
          className={styles.history}
          onClick={() => {
            setIsResultModalOpen((prev) => {
              return { ...prev, show: true, justCheck: true };
            });
          }}
        >
          이전 검사 결과를 알고 싶어요
        </button>
      </div>
    </>
  );
}

async function updateExaminationResult(selectedQuestionList) {
  try {
    if (
      selectedQuestionList.filter((selectedQuestion) => selectedQuestion === "")
        .length === 60
    ) {
      alert("최소 1개 이상 선택하여 주십시오.");
      return false;
    }

    const result = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0 };
    selectedQuestionList.forEach((selectedQuestion) => {
      if (selectedQuestion === "") {
        return;
      }
      result[selectedQuestion] += 1;
    });

    await HanyangMajorAptitudeResultRequest.updateResult(result);

    return true;
  } catch (e) {}
}

async function setIsDoneExamination(setIsDone) {
  const data = await HanyangMajorAptitudeResultRequest.findResult();
  setIsDone((prev) => {
    let curr = [...prev];
    curr[0] = data.A !== null;
    return curr;
  });
}

export default HanyangMajorAptitude;
