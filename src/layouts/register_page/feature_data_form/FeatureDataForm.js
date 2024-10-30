import { TextField, Select } from "components";
import styles from "./FeatureDataForm.module.css";

const MBTISelectItems = [
  { name: "ISTJ", value: "ISTJ" },
  { name: "ISFJ", value: "ISFJ" },
  { name: "INFJ", value: "INFJ" },
  { name: "INTJ", value: "INTJ" },
  { name: "ISTP", value: "ISTP" },
  { name: "ISFP", value: "ISFP" },
  { name: "INFP", value: "INFP" },
  { name: "INTP", value: "INTP" },
  { name: "ESTP", value: "ESTP" },
  { name: "ESFP", value: "ESFP" },
  { name: "ENFP", value: "ENFP" },
  { name: "ENTP", value: "ENTP" },
  { name: "ESTJ", value: "ESTJ" },
  { name: "ESFJ", value: "ESFJ" },
  { name: "ENFJ", value: "ENFJ" },
  { name: "ENTJ", value: "ENTJ" },
];

function FeatureDataForm({ featureData, setFeatureData, onDone }) {
  return (
    <>
      <Select
        label="MBTI"
        value={featureData.MBTI}
        setValue={(v) => {
          setFeatureData((prev) => {
            return { ...prev, MBTI: v };
          });
        }}
        items={MBTISelectItems}
      />
      <TextField
        variant="outlined"
        label="관심 분야"
        value={featureData.interestPart}
        setValue={(v) => {
          setFeatureData((prev) => {
            return { ...prev, interestPart: v };
          });
        }}
      />
      <TextField
        variant="outlined"
        label="자신의 강점"
        value={featureData.strength}
        setValue={(v) => {
          setFeatureData((prev) => {
            return { ...prev, strength: v };
          });
        }}
      />
      <TextField
        variant="outlined"
        label="좋아하는 일 (취미)"
        value={featureData.favorite}
        setValue={(v) => {
          setFeatureData((prev) => {
            return { ...prev, favorite: v };
          });
        }}
      />
      <TextField
        variant="outlined"
        label="자신을 한마디로 표현한다면?"
        value={featureData.sentenceOfoneself}
        setValue={(v) => {
          setFeatureData((prev) => {
            return { ...prev, sentenceOfoneself: v };
          });
        }}
      />
      <button className={styles.submitButton} onClick={onDone}>
        회원가입
      </button>
    </>
  );
}

export default FeatureDataForm;
