import { Checkbox, FormControlLabel } from "@mui/material";
import { TextField } from "components";
import styles from "./AccountDataForm.module.css";

function AccountDataForm({ accountData, setAccountData, onDone }) {
  return (
    <>
      <TextField
        variant="outlined"
        label="닉네임"
        value={accountData.nickname}
        setValue={(v) => {
          setAccountData((prev) => {
            return { ...prev, nickname: v };
          });
        }}
      />
      <TextField
        variant="outlined"
        label="이름"
        value={accountData.name}
        setValue={(v) => {
          setAccountData((prev) => {
            return { ...prev, name: v };
          });
        }}
      />
      <TextField
        variant="outlined"
        label="소속"
        value={accountData.belongTo}
        setValue={(v) => {
          setAccountData((prev) => {
            return { ...prev, belongTo: v };
          });
        }}
      />
      <TextField
        variant="outlined"
        label="나이"
        value={accountData.age}
        setValue={(v) => {
          setAccountData((prev) => {
            return { ...prev, age: v };
          });
        }}
      />
      <TextField
        type="password"
        variant="outlined"
        label="비밀번호"
        value={accountData.password}
        setValue={(v) => {
          setAccountData((prev) => {
            return { ...prev, password: v };
          });
        }}
      />
      <FormControlLabel
        className={styles.checkBoxContainer}
        control={
          <Checkbox
            className={styles.checkBox}
            checked={accountData.allowCollect}
            onChange={(e) => {
              setAccountData((prev) => {
                return { ...prev, allowCollect: e.target.checked };
              });
            }}
          />
        }
        label="개인정보 수집에 동의하십니까?"
      />
      <button className={styles.submitButton} onClick={onDone}>
        다음
      </button>
    </>
  );
}

export default AccountDataForm;
