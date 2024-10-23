import SubmitPageTemplate from "components/page/submit_page/SubmitPageTemplate";
import { TextField } from "components";
import { useState } from "react";
import SubmitRequest from "api/SubmitRequest";
import { setCookie } from "lib/Cookie";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [loginData, setLoginData] = useState({ nickname: "", password: "" });

  return (
    <SubmitPageTemplate
      title="로그인"
      link={{ url: "/register", text: "아직 사이트에 가입하지 않으셨나요?" }}
      onSubmit={() => {
        login(loginData);
      }}
    >
      <TextField
        variant="outlined"
        label="닉네임"
        value={loginData.nickname}
        setValue={(v) => {
          setLoginData((prev) => {
            return { ...prev, nickname: v };
          });
        }}
      />
      <TextField
        type="password"
        variant="outlined"
        label="비밀번호"
        value={loginData.password}
        setValue={(v) => {
          setLoginData((prev) => {
            return { ...prev, password: v };
          });
        }}
      />
    </SubmitPageTemplate>
  );
}

async function login(loginData) {
  const { nickname, password } = loginData;
  if (!nickname || !password) {
    alert("모두 작성하여 주십시오.");
    return;
  }

  try {
    const accessToken = await SubmitRequest.login(loginData);
    setCookie("access-token", accessToken);
    window.location.href = "/";
  } catch (e) {
    console.log(e.response.data);
    const errMsg = e.response.data;
    switch (errMsg) {
      case "nickname or password is wrong":
        alert("닉네임과 비밀번호를 확인하여 주십시오.");
        return;

      default:
        alert("알 수 없는 오류가 발생하였습니다.");
    }
  }
}

export default LoginPage;
