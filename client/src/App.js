import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Header from "./component/Header";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/Theme";
import { Suspense, lazy, useEffect, useState } from "react";
import { getUser } from "api/userAPI";
import { getPlaces } from "api/writingAPI";
import NotFound from "component/NotFound";

const Main = lazy(() => import("./page/Main/Main"));
const Login = lazy(() => import("./page/Login/Login"));
const Signup = lazy(() => import("./page/SignUp/Signup"));
const Editor = lazy(() => import("./page/Editor/Editor"));
const Edit = lazy(() => import("./page/Edit/Edit"));
const Mypage = lazy(() => import("./page/Mypage/Mypage"));
const Detail = lazy(() => import("./page/Detail/Detail"));
const Setting = lazy(() => import("./page/Setting/Setting"));

function App() {
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

  // 게시글
  useEffect(() => {
    const getPlaceInfo = async () => {
      const res = await getPlaces();
      setUserPlace(res?.data?.places);
    };
    getPlaceInfo();
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header userInfo={userInfo} />
          <Suspense fallback={<h1>Loading...</h1>}>
            <Routes>
              <Route
                path="/"
                element={<Main userInfo={userInfo} userPlace={userPlace} />}
              />
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
              <Route path="/setting/:id" element={<Setting />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
