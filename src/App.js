import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Header from "./component/Header";
import Nav from "./component/nav";
import Mypage from "./page/Mypage/Mypage";
import Main from "./page/Main/Main";
import Editor from "./page/Editor/editor";
import Login from "./page/Login/Login";
import Signup from "./page/SignUp/Signup";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/Theme";
import Detail from "./page/Detail/Detail";

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Nav />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/detail" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
