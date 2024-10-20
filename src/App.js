import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage, GroupChatListPage, GroupChatPage } from "pages";
import { createTheme, ThemeProvider } from "@mui/material";
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
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/group-chat" element={<GroupChatListPage />} />
            <Route path="/group-chat/:groupChatId" element={<GroupChatPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
