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
import Edit from "page/Edit/Edit";
import { useEffect, useState } from "react";
import { authService } from "fBase";

function App() {
  const [displayName, setDisplayName] = useState("");
  const [uid, SetUid] = useState();
  const [user, setUser] = useState();
  const [imageUrl, setImageUrl] = useState();
  // displayName 불러오기
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        setDisplayName(user.displayName);
        SetUid(user.uid);
        setImageUrl(user.photoURL);
        setUser(user);
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
            <Route
              path="/"
              element={
                <Main displayName={displayName} uids={uid} user={user} />
              }
            />
            <Route path="/login" element={<Login />} uid={uid} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/editor"
              element={<Editor displayName={displayName} uid={uid} />}
            />
            <Route
              path="/edit"
              element={<Edit displayName={displayName} uid={uid} />}
            />
            <Route
              path="/mypage"
              element={
                <Mypage
                  displayName={displayName}
                  uid={uid}
                  user={user}
                  imageUrl={imageUrl}
                />
              }
            />
            <Route
              path="/detail/:id"
              element={<Detail displayName={displayName} uid={uid} />}
            />
            <Route
              path="/setting"
              element={<Setting displayName={displayName} user={user} />}
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
