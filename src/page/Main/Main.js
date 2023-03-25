import React, { useEffect, useState } from "react";
import styled from "styled-components";
import App from "../../App";
import theme from "../../styles/Theme";
import imgs from "../../profile.jpg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { getWrite } from "../../api/userAPI";
import Editor from "../Editor/Editor";
import { Cookies, useCookies } from "react-cookie";
import axios from "axios";
import Loading from "../../component/Loading";
import * as s from "./style";

const Main = () => {
  const cookie = new Cookies();
  // 3가지 menu
  const [menu, setMenu] = useState(0);
  const MainMenu = [
    { name: "Your Feed" },
    { name: "Global Feed" },
    { name: "태그 제목" },
  ];
  // axios
  const [global, setGlobal] = useState([]);
  const [your, setYour] = useState([]);
  // 뭐가 작동할 때? 글 쓸 때만 작동이 되야 한다

  useEffect(() => {
    async function getUserWrite() {
      try {
        const local = localStorage.getItem("token");
        console.log("username", local);
        const res = await getWrite(local);
        setYour(res);
        console.log("setyour", res);
      } catch (err) {
        console.log(err);
      }
    }
    getUserWrite();
  }, []);
  // 챗 gpt에서 에디터의 내용과 메인의 코드 내용은 관련이 없으니 에디터의 내용을 여기서 새로 담아야 할거 같다
  // 그러면 밑에 코드랑 비슷하게 해서 담아서 유즈 이펙으로 에디터 작성시 나타나는 걸로 생각해보자
  // 맵을 쓸 때 문제가 있을 수도 있으니 setyour에 담아서 해야한다 아마도 ㅋㅋ
  // useEffect(() => {
  // const getUserReal = async () => {
  //   try {
  //     const res = await axios.get("http:localhost:1337/api/reals");
  //     setYour(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // getUserReal().then((reals) => {
  //   console.log(reals);
  //   console.log(your);
  // });
  // }, []);

  console.log("yy", your);
  // console.log("yyy", cookies); // 토큰 값 받아옴
  // 블로그 보면서 어디에 유저 줘야 안에 들어가는지 확인 하고 둘다 서로 한테 유저 바꿔서 되는거 찾아보고 안되면 구글링 밑 유튜브 차장보기
  const mainCurrent = (index) => {
    setMenu(index);
  };
  return (
    <s.MainContainer>
      {/* 토큰 있으면 이미지 부분 없애기  */}
      <s.MainImg>
        <h1 className="Container">conduit</h1>
        <p className="Span">A place to share your knowledge.</p>
      </s.MainImg>

      <div>
        <s.MainUl>
          {MainMenu.map((el, index) => {
            return (
              <li key={index}>
                <button
                  className={menu === index ? "Main-item focused" : "Main-item"}
                  onClick={() => mainCurrent(index)}
                >
                  {el.name}
                </button>
              </li>
            );
          })}
        </s.MainUl>
      </div>
      {/* <div>Loding</div> */}
      {your.length > 0 &&
        your.map((item, key) => (
          <s.MainMap key={key}>
            <s.MapInfo>
              <s.MapPicture href="/mypage">
                <s.Img src={imgs} alt="profile" />
              </s.MapPicture>
              <s.Info>
                <div className="info">
                  <s.MapName href="/mypage">
                    {item.local}
                    {console.log(item)}
                  </s.MapName>
                  <s.MapTime>나ㄹ짜 적ㅣ</s.MapTime>
                </div>
                <div className="Like">
                  <s.MapLike>
                    <FcLikePlaceholder />
                    {item.attributes.like}
                  </s.MapLike>
                </div>
              </s.Info>
            </s.MapInfo>
            <s.MapContent>
              <s.MapTitle href="/detail">
                <h1 className="title">{item.attributes.title}</h1>
                <p className="content">{item.attributes.content}</p>
                <span className="span">Read more...</span>
                <s.MapUl>
                  <li> {item.attributes.tags}</li>
                </s.MapUl>
              </s.MapTitle>
            </s.MapContent>
          </s.MainMap>
        ))}
      {/* <div>
        <div>Popular Tags</div>
      </div> */}
    </s.MainContainer>
  );
};

export default Main;
