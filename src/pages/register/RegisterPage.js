import SubmitPageTemplate from "components/page/submit_page/SubmitPageTemplate";
import { TextField } from "components";
import { useState } from "react";
import SubmitRequest from "api/SubmitRequest";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    nickname: "",
    name: "",
    belongTo: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <SubmitPageTemplate
      title="회원가입"
      link={{ url: "/login", text: "이미 사이트에 가입하셨나요?" }}
      onSubmit={() => {
        Register(registerData);
      }}
    >
      <TextField
        variant="outlined"
        label="닉네임"
        value={registerData.nickname}
        setValue={(v) => {
          setRegisterData((prev) => {
            return { ...prev, nickname: v };
          });
        }}
      />
      <TextField
        variant="outlined"
        label="이름"
        value={registerData.name}
        setValue={(v) => {
          setRegisterData((prev) => {
            return { ...prev, name: v };
          });
        }}
      />
      <TextField
        variant="outlined"
        label="소속"
        value={registerData.belongTo}
        setValue={(v) => {
          setRegisterData((prev) => {
            return { ...prev, belongTo: v };
          });
        }}
      />
      <TextField
        variant="outlined"
        label="나이"
        value={registerData.age}
        setValue={(v) => {
          setRegisterData((prev) => {
            return { ...prev, age: v };
          });
        }}
      />
      <TextField
        type="password"
        variant="outlined"
        label="비밀번호"
        value={registerData.password}
        setValue={(v) => {
          setRegisterData((prev) => {
            return { ...prev, password: v };
          });
        }}
      />
      <TextField
        type="password"
        variant="outlined"
        label="비밀번호 확인"
        value={registerData.confirmPassword}
        setValue={(v) => {
          setRegisterData((prev) => {
            return { ...prev, confirmPassword: v };
          });
        }}
      />
    </SubmitPageTemplate>
  );
}

async function Register(registerData) {
  const { nickname, name, belongTo, age, password, confirmPassword } = registerData;
  if (!nickname || !name || !belongTo || !age || !password || !confirmPassword) {
    alert("모두 작성하여 주십시오.");
    return;
  }

  if (password !== confirmPassword) {
    alert("비밀번호와 비밀번호 확인란이 같지 않습니다.");
    return;
  }

  try {
    await SubmitRequest.register(registerData);
    window.location.href = "/login";
  } catch (e) {
    console.log(e);
  }
}

export default RegisterPage;
