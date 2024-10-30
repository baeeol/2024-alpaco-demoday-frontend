import SubmitPageTemplate from "components/page/submit_page/SubmitPageTemplate";
import { useState } from "react";
import SubmitRequest from "api/SubmitRequest";
import { AccountDataForm, FeatureDataForm } from "layouts/register_page";
import styles from "./RegisterPage.module.css";

const PAGE = {
  ACCOUNT_DATA_FORM: "account data form",
  FEATURE_DATA_FORM: "feature data form",
};

function RegisterPage() {
  const [currentPage, setCurrentPage] = useState(PAGE.ACCOUNT_DATA_FORM);
  const [accountData, setAccountData] = useState({
    nickname: "",
    name: "",
    belongTo: "",
    age: "",
    password: "",
    allowCollect: false,
  });
  const [featureData, setFeatureData] = useState({
    MBTI: "",
    interestPart: "",
    strength: "",
    favorite: "",
    sentenceOfoneself: "",
  });

  // eslint-disable-next-line default-case
  switch (currentPage) {
    case PAGE.ACCOUNT_DATA_FORM:
      return (
        <SubmitPageTemplate
          title="회원 가입"
          link={{ url: "/login", text: "이미 사이트에 가입하셨나요?" }}
        >
          <AccountDataForm
            accountData={accountData}
            setAccountData={setAccountData}
            onDone={() => {
              const { nickname, name, belongTo, age, password, allowCollect } =
                accountData;

              if (!nickname || !name || !password || !belongTo || !age) {
                alert("모두 작성하여 주십시오.");
                return;
              }

              if (!allowCollect) {
                alert("개인정보 수집에 동의하여 주십시오.");
                return;
              }

              setCurrentPage(PAGE.FEATURE_DATA_FORM);
            }}
          />
        </SubmitPageTemplate>
      );
    case PAGE.FEATURE_DATA_FORM:
      return (
        <SubmitPageTemplate
          title="회원가입"
          link={{ url: "/login", text: "이미 사이트에 가입하셨나요?" }}
        >
          <FeatureDataForm
            featureData={featureData}
            setFeatureData={setFeatureData}
            onDone={async () => {
              const { MBTI, interestPart, strength, favorite, sentenceOfoneself } =
                featureData;

              if (
                !MBTI ||
                !interestPart ||
                !strength ||
                !favorite ||
                !sentenceOfoneself
              ) {
                alert("모두 작성하여 주십시오.");
                return;
              }

              await register(accountData, featureData);
            }}
          />
        </SubmitPageTemplate>
      );
  }
}

async function register(accountData, featureData) {
  try {
    await SubmitRequest.register({ accountData: accountData, featureData: featureData });
    alert("회원가입이 완료되었습니다!");
    window.location.href = "/login";
  } catch (e) {
    const errMsg = e.response.data;
    switch (errMsg) {
      case "nickname is exist":
        alert("이미 존재하는 닉네임입니다.");
        return;

      default:
        alert("알 수 없는 오류가 발생하였습니다.");
    }
  }
}

export default RegisterPage;
