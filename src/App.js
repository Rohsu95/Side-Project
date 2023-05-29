import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Header from "./component/Header";
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
import { authService, dbService } from "fBase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function App() {
  const [user, setUser] = useState();

  const [nweets, setNweets] = useState([]);
  const [nweets1, setNweets1] = useState([]);
  // displayName 불러오기
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }
    });

    return unsubscribe;
  }, []);

  // 작성한 글 보여주기
  useEffect(() => {
    const q = query(
      collection(dbService, "editor"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr);
      setNweets1(nweetArr);
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header user={user} />

          <Routes>
            <Route
              path="/"
              element={<Main user={user} nweets={nweets} nweets1={nweets1} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/editor" element={<Editor user={user} />} />
            <Route path="/edit" element={<Edit user={user} />} />
            <Route
              path="/mypage"
              element={<Mypage user={user} nweets={nweets} />}
            />
            <Route path="/detail/:ids" element={<Detail user={user} />} />
            <Route path="/setting" element={<Setting user={user} />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
