import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Header from "./component/Header";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/Theme";
import { Suspense, lazy, useEffect, useState } from "react";
import { authService, dbService } from "fBase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getUser } from "api/userAPI";
import { getPlaces } from "api/writingAPI";

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

  // 유저 정보
  const [userInfo, setUserInfo] = useState([]);

  // place(게시글) 정보
  const [userPlace, setUserPlace] = useState([]);

  // 유저 정보
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUser();
      setUserInfo(res?.data?.users);
    };
    getUserInfo();
  }, []);
  console.log("app에서의 ", userInfo);
  // 게시글
  useEffect(() => {
    const getPlaceInfo = async () => {
      const res = await getPlaces();
      setUserPlace(res?.data?.places);
    };
    getPlaceInfo();
  }, []);

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
          <Header userInfo={userInfo} />
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/editor" element={<Editor userInfo={userInfo} />} />
              <Route
                path="/edit/:id"
                element={<Edit userPlace={userPlace} />}
              />
              <Route
                path="/mypage"
                element={<Mypage userInfo={userInfo} userPlace={userPlace} />}
              />
              <Route
                path="/detail/:id"
                element={<Detail userPlace={userPlace} userInfo={userInfo} />}
              />
              <Route path="/setting/:id" element={<Setting user={user} />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
