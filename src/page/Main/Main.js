import React, { useEffect, useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { Cookies } from "react-cookie";
import * as s from "./style";
import { RiDeleteBinLine } from "react-icons/ri";
import theme from "styles/Theme";

import { getUser } from "api/userAPI";
import { deletePlaces, getPlaces } from "api/writingAPI";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  // 쿠키에 담긴 userId
  const userId = cookie.get("userId");
  const userName = cookie.get("username");

  // 2가지 menu
  const [menu, setMenu] = useState(0);
  const MainMenu = [{ name: "Global Articles" }, { name: "My Articles" }];

  // user 정보
  const [userInfo, setUserInfo] = useState([]);
  // place(게시글) 정보
  const [userPlace, setUserPlace] = useState([]);

  // 이동
  const navigate = useNavigate();

  const myPlace = userPlace?.filter((el) => el.creator === userId);
  const myName = userInfo?.map((el) => el.username);

  // console.log("myPlace", myName);

  const mainCurrent = (index) => {
    setMenu(index);
  };

  // 작성한 글 삭제
  const onDeletePage = async (id) => {
    if (!window.confirm("삭제 하시겠습니까?")) {
      alert("취소하였습니다.");
    } else {
      await deletePlaces(Token, id);
      window.location.reload();
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUser();
      setUserInfo(res?.data?.users);
    };
    getUserInfo();
  }, []);
  console.log("userInfo이다", userInfo);

  useEffect(() => {
    const getPlaceInfo = async () => {
      const res = await getPlaces();
      setUserPlace(res?.data?.places);
    };
    getPlaceInfo();
  }, []);
  // console.log("userPlace", userPlace);

  // 저녁에 댓글 부분 댓글이 모든 게시물마다 나온다 해당 게시물에만 나올 수 있게 해보자 그것만 하고
  // 그것만 하고 나머지 기능들 정상작동 하는지 확인해보고 인강 들을거 있는지 보고
  // 그 담에 갑자기 특정 경우에 안되는 경우도 있으니 로그인 후 확인 로그인 전 확인 로그인 하고 껏을 경우
  // 로그이ㅣㄴ 하고 껐을 경우 확인 해보고 다 확인 되면 불필요한 코드 정리 하자
  return (
    <s.MainContainer>
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
      {menu === 0 || myPlace === undefined
        ? userPlace
            ?.map((item, key) => (
              <s.MainMap key={key}>
                <s.MainBorder>
                  <s.MapInfo>
                    <s.MapPicture>
                      <s.Img
                        key={item.id}
                        src={`http://localhost:8000/${item?.image}`}
                        alt="profile"
                      />
                    </s.MapPicture>
                    <s.Info>
                      <div className="info">
                        <s.MapName>
                          {item.creator === userId ? userName : item.username}
                        </s.MapName>
                        <s.MapTime>{item.createdAt}</s.MapTime>
                      </div>
                      <div className="Like">
                        {Token && item.creator === userId ? (
                          <s.InfoBtn
                            aria-label="trash_button"
                            border={`${theme.colors.main}`}
                            color={`${theme.colors.main}`}
                            hover={`${theme.colors.main_hover}`}
                            hover_color="white"
                            onClick={() => onDeletePage(item.id)}
                          >
                            <RiDeleteBinLine />
                          </s.InfoBtn>
                        ) : (
                          ""
                        )}
                      </div>
                    </s.Info>
                  </s.MapInfo>
                  <s.MapContent>
                    <s.MapTitle href={`/detail/${item.id}`}>
                      <h1 className="title">{item.title}</h1>
                      <p className="content">{item.content}</p>
                      <span className="span">Read more...</span>
                      <s.MapUl>
                        {item.tags.split(",").map((tag, index) => (
                          <li key={index}>{tag}</li>
                        ))}
                      </s.MapUl>
                    </s.MapTitle>
                  </s.MapContent>
                </s.MainBorder>
              </s.MainMap>
            ))
            .reverse()
        : ""}
      {Token ? "" : <s.Loading>로그인을 해주세요...</s.Loading>}

      {menu === 1 || myPlace === undefined
        ? myPlace
            ?.map((item, key) => (
              <s.MainMap key={key}>
                <s.MainBorder>
                  <s.MapInfo>
                    <s.MapPicture>
                      <s.Img
                        key={item.id}
                        src={
                          // item.uid === user.uid
                          //   ? user?.photoURL
                          //   : item?.attachmentUrl
                          `http://localhost:8000/${item?.image}`
                          // item.image
                        }
                        alt="profile"
                      />
                    </s.MapPicture>
                    <s.Info>
                      <div className="info">
                        <s.MapName>{userName}</s.MapName>

                        <s.MapTime>{item.createdAt}</s.MapTime>
                      </div>
                      <div className="Like">
                        {item.creator === userId ? (
                          <s.InfoBtn
                            aria-label="trash_button"
                            border={`${theme.colors.main}`}
                            color={`${theme.colors.main}`}
                            hover={`${theme.colors.main_hover}`}
                            hover_color="white"
                            onClick={() => onDeletePage(item.id)}
                          >
                            <RiDeleteBinLine />
                          </s.InfoBtn>
                        ) : (
                          ""
                        )}
                      </div>
                    </s.Info>
                  </s.MapInfo>
                  <s.MapContent>
                    <s.MapTitle href={`/detail/${item.id}`}>
                      <h1 className="title">{item.title}</h1>
                      <p className="content">{item.content}</p>
                      <span className="span">Read more...</span>
                      <s.MapUl>
                        {item.tags.split(",").map((tag, index) => (
                          <li key={index}>{tag}</li>
                        ))}
                      </s.MapUl>
                    </s.MapTitle>
                  </s.MapContent>
                </s.MainBorder>
              </s.MainMap>
            ))
            .reverse()
        : ""}
    </s.MainContainer>
  );
};

export default Main;
