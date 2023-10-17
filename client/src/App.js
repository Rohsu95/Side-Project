import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import Header from "./component/Header";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/Theme";
import { Suspense, lazy, useEffect, useState } from "react";
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

// 로그인 안한 상태에선 더 건들이건 없는거 같다.
// 회원 가입 이미지를 이미지가 없어도 통신이 될 수 있게 하자 그러면 빈 문자열일 경우 basic을 주면 되니까
// 헤더에 작아졌을 때 상태의 세팅 아이콘 위치 조절

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
  // console.log("app에서의 ", userInfo);
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
              <Route path="/setting/:id" element={<Setting />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
