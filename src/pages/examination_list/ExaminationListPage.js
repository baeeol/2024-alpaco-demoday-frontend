import { ExaminationSummary } from "layouts/examination_list_page";
import { useState, useEffect } from "react";
import HanyangMajorAptitudeResultRequest from "api/HanyangMajorAptitudeResultRequest";
import styles from "./ExaminationListPage.module.css";

function ExaminationListPage() {
  const [isDoneList, setIsDoneList] = useState([false]);

  useEffect(() => {
    setIsHanyangMajorAptitudeDone(setIsDoneList);
  }, []);

  return (
    <div className={styles.examinationListContainer}>
      <div className={styles.examinationList}>
        <ExaminationSummary
          name="한양대 전공적합성 검사"
          description="전공 적합성 검사를 통해 자신이 어떤 성향의 사람인지, 어떤 분야에 적합한지 알아봅시다."
          requiredTime="10분"
          questionAmount="60문항"
          isDone={isDoneList[0]}
          link="/user/examination/hanyang-major-aptitude"
        />
      </div>
    </div>
  );
}

async function setIsHanyangMajorAptitudeDone(setIsDoneList) {
  const data = await HanyangMajorAptitudeResultRequest.findResult();

  setIsDoneList((prev) => {
    let curr = [...prev];
    curr[0] = data.A !== null;
    return curr;
  });
}

export default ExaminationListPage;
