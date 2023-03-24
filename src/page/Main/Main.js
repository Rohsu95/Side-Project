import React, { useEffect, useState } from "react";
import styled from "styled-components";
import App from "../../App";
import theme from "../../styles/Theme";
import imgs from "../../profile.jpg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { getWrite } from "../../api/userAPI";
import Editor from "../Editor/Editor";
import { Cookies, useCookies } from "react-cookie";
import { get } from "react-hook-form";
import axios from "axios";
const MainContainer = styled.div``;

const MainImg = styled.div`
  height: 11rem;
  background-color: ${theme.colors.main};
  text-align: center;
  padding: 1rem;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  .Container {
    color: ${theme.colors.white};
    font-weight: 700;
    font-size: ${theme.fontSizes.fs25};
    margin-top: 1.5rem;
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs2};
      padding: 0.55rem;
    }
  }
  .Span {
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes.fs15};
    margin-top: 1rem;
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs1};
      padding: 0.55rem;
    }
  }
`;
const MainUl = styled.ul`
  list-style: none;
  border-bottom: 2px solid ${theme.colors.gray_02};
  display: flex;
  margin-left: 3rem;
  margin-right: 3rem;

  li {
    margin-top: 1rem;
  }
  .Main-item {
    border: none;
    cursor: pointer;
    padding: 0.75rem;
    color: ${theme.colors.content};
    font-size: ${theme.fontSizes.fs1};
    background-color: ${theme.colors.white};

    &:hover {
      color: ${theme.colors.title};
    }
    @media ${theme.media.height} {
      white-space: nowrap;
      font-size: ${theme.fontSizes.fs07};
    }
  }
  .focused {
    color: ${theme.colors.main};
    border-bottom: 2px solid ${theme.colors.main};

    &:hover {
      color: ${theme.colors.main_hover};
    }
  }
`;
const MainMap = styled.div`
  margin: 2rem 3rem 0 3rem;
  border-bottom: 2px solid ${theme.colors.gray_03};
`;
const MapPicture = styled.a`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 30px;
  border: 1px solid gray;
  margin-right: 0.5rem;
`;
const MapInfo = styled.div`
  display: flex;
`;
const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .info {
    display: flex;
    flex-direction: column;
  }
  .Like {
    display: flex;
    align-items: center;

    @media ${theme.media.height} {
      white-space: nowrap;
    }
  }
`;
const MapName = styled.a`
  color: ${theme.colors.main};
  text-decoration: none;
  font-size: ${theme.fontSizes.fs1};
  &:hover {
    color: ${theme.colors.main_hover};
  }
`;
const MapTime = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.content};
`;
const MapLike = styled.button`
  /* width: 6.5vw; */
  padding: 0 0.25rem;
  height: 2.5vh;
  border-radius: 5px;
  border: 1px solid ${theme.colors.main};
  background-color: white;

  @media ${theme.media.height} {
    font-size: ${theme.fontSizes.fs0};
  }
`;
const MapContent = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;
const MapTitle = styled.a`
  text-decoration: none;
  .title {
    font-size: ${theme.fontSizes.fs15};
    color: ${theme.colors.title};
    margin-bottom: 3px;
  }
  .content {
    font-size: ${theme.fontSizes.fs1};
    color: ${theme.colors.content};
    margin-bottom: 1rem;
  }
  .span {
    color: ${theme.colors.content};
  }
`;
const MapUl = styled.ul`
  float: right;
  display: flex;
  list-style: none;
  color: ${theme.colors.content};
  font-size: ${theme.fontSizes.fs0};

  li {
    border: 2px solid ${theme.colors.gray_03};
    padding: 0.125rem 0.25rem;
    border-radius: 20px;
    margin-left: 0.5rem;
  }
`;

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
  const getUserReal = async () => {
    try {
      const res = await axios.get("http:localhost:1337/api/reals");
      setYour(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  getUserReal().then((reals) => {
    console.log(reals);
    console.log(your);
  });
  // }, []);

  console.log("yy", your);
  // console.log("yyy", cookies); // 토큰 값 받아옴
  // 블로그 보면서 어디에 유저 줘야 안에 들어가는지 확인 하고 둘다 서로 한테 유저 바꿔서 되는거 찾아보고 안되면 구글링 밑 유튜브 차장보기
  const mainCurrent = (index) => {
    setMenu(index);
  };
  return (
    <MainContainer>
      {/* 토큰 있으면 이미지 부분 없애기  */}
      <MainImg>
        <h1 className="Container">conduit</h1>
        <p className="Span">A place to share your knowledge.</p>
      </MainImg>

      <div>
        <MainUl>
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
        </MainUl>
      </div>

      {your.length > 0 &&
        your.map((item, key) => (
          <MainMap key={key}>
            <MapInfo>
              <MapPicture href="/mypage">
                <Img src={imgs} alt="profile" />
              </MapPicture>
              <Info>
                <div className="info">
                  <MapName href="/mypage">
                    {item.local}
                    {console.log(item)}
                  </MapName>
                  <MapTime>나ㄹ짜 적ㅣ</MapTime>
                </div>
                <div className="Like">
                  <MapLike>
                    <FcLikePlaceholder />
                    {item.attributes.like}
                  </MapLike>
                </div>
              </Info>
            </MapInfo>
            <MapContent>
              <MapTitle href="/detail">
                <h1 className="title">{item.attributes.title}</h1>
                <p className="content">{item.attributes.content}</p>
                <span className="span">Read more...</span>
                <MapUl>
                  <li> {item.attributes.tags}</li>
                </MapUl>
              </MapTitle>
            </MapContent>
          </MainMap>
        ))}
      {/* <div>
        <div>Popular Tags</div>
      </div> */}
    </MainContainer>
  );
};

export default Main;
