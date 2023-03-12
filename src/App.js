import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Header from "./component/Header";
import Nav from "./component/nav";
import Editor from "./page/Editor/editor";
import Login from "./page/Login/Login";
import Main from "./page/Main";
import Signup from "./page/SignUp/Signup";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/Theme";

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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
