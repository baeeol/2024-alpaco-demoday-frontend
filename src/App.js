import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  GroupChatListPage,
  GroupChatPage,
  QuestionListPage,
  QuestionWritePage,
  QuestionPage,
  LoginPage,
  RegisterPage,
  ExaminationListPage,
  Examination,
} from "pages";
import { createTheme, ThemeProvider } from "@mui/material";
import { Navigation } from "pages";
import PageTemplate from "components/page/template/PageTemplate";
import styles from "./App.module.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fd6262",
    },
  },
});

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <PageTemplate isFullScreen={true}>
          <Navigation />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/group-chat" element={<GroupChatListPage />} />
            <Route path="/group-chat" element={<GroupChatListPage />} />
            <Route path="/group-chat/:groupChatId" element={<GroupChatPage />} />
            <Route path="/question" element={<QuestionListPage />} />
            <Route path="/question/write" element={<QuestionWritePage />} />
            <Route path="/question/:questionId" element={<QuestionPage />} />
            <Route path="/user/examination" element={<ExaminationListPage />} />
            <Route path="/user/examination/:id" element={<Examination />} />
          </Routes>
        </PageTemplate>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
