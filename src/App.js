import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Header from "./component/Header";
import Nav from "./component/nav";
import Mypage from "./page/Mypage/Mypage";
import Main from "./page/Main/Main";
import Editor from "./page/Editor/Editor";
import Login from "./page/Login/Login";
import Signup from "./page/SignUp/Signup";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/Theme";
import Detail from "./page/Detail/Detail";
import Setting from "./page/Setting/Setting";
import { useEffect, useState } from "react";
import { authService } from "fBase";

function App() {
  const [displayName, setDisplayName] = useState("");

  // displayName 불러오기
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        setDisplayName(user.displayName);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header displayName={displayName} />
          <Nav />
          <Routes>
            <Route path="/" element={<Main displayName={displayName} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route
              path="/detail/:id"
              element={<Detail displayName={displayName} />}
            />
            <Route
              path="/setting"
              element={<Setting displayName={displayName} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
