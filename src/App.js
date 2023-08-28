import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Header from "./component/Header";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/Theme";
import { Suspense, lazy, useEffect, useState } from "react";
import { authService, dbService } from "fBase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const Main = lazy(() => import("./page/Main/Main"));
const Login = lazy(() => import("./page/Login/Login"));
const Signup = lazy(() => import("./page/SignUp/Signup"));
const Editor = lazy(() => import("./page/Editor/Editor"));
const Edit = lazy(() => import("./page/Edit/Edit"));
const Mypage = lazy(() => import("./page/Mypage/Mypage"));
const Detail = lazy(() => import("./page/Detail/Detail"));
const Setting = lazy(() => import("./page/Setting/Setting"));

function App() {
  const [user, setUser] = useState();

  const [nweets, setNweets] = useState([]);

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
      // 하나는 전체 글 보기용, 하나는 내가 작성한 글 보기용
      setNweets(nweetArr);
    });
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header user={user} />
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              <Route path="/" element={<Main user={user} nweets={nweets} />} />
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
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
