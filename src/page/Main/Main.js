import React, { useState } from "react";
import styled from "styled-components";
import App from "../../App";
import theme from "../../styles/Theme";
import imgs from "../../profile.jpg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
const MainContainer = styled.div`
  .ContainerSlice {
    border: 2px solid red;
  }
  .test {
    display: flex;
  }
`;
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
  }
`;
const MapName = styled.a`
  color: ${theme.colors.main};
  text-decoration: none;
  font-size: ${theme.fontSizes.fs1};
`;
const MapTime = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.content};
`;
const MapLike = styled.button`
  width: 6.5vw;
  height: 2.5vh;
  border-radius: 5px;
  border: 1px solid ${theme.colors.main};
  background-color: white;
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
  const [menu, setMenu] = useState(0);
  const MainMenu = [
    { name: "Your Feed" },
    { name: "Global Feed" },
    { name: "태그 제목" },
  ];
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
      {/* FcLikePlaceholder FcLike */}
      <MainMap>
        <MapInfo>
          <MapPicture href="/mypage">
            <Img src={imgs} alt="profile" />
          </MapPicture>
          <Info>
            <div className="info">
              <MapName href="/mypage">shtngur</MapName>
              <MapTime>mon 03 2023</MapTime>
            </div>
            <div className="Like">
              <MapLike>
                <FcLikePlaceholder />
                800
              </MapLike>
            </div>
          </Info>
        </MapInfo>
        <MapContent>
          <MapTitle href="/detail">
            <h1 className="title">
              If we quantify the alarm, we can get to the FTP pixel through the
              online SSL interface!
            </h1>
            <p className="content">
              Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam aut
              cupiditate est facere omnis possimus. Tenetur similique nemo illo
              soluta molestias facere quo. Ipsam totam facilis delectus nihil
              quidem soluta vel est omnis.
            </p>
            <span className="span">read more...</span>
            <MapUl>
              <li>return</li>
              <li>hic</li>
            </MapUl>
          </MapTitle>
        </MapContent>
      </MainMap>

      {/* <div>
        <div>Popular Tags</div>
      </div> */}
    </MainContainer>
  );
};

export default Main;
