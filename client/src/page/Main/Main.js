import React, { useEffect, useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { Cookies } from "react-cookie";
import * as s from "./style";
import { RiDeleteBinLine } from "react-icons/ri";
import theme from "styles/Theme";

import { getUser } from "api/userAPI";
import { deletePlaces, getPlaces } from "api/writingAPI";
import { useNavigate } from "react-router-dom";
import { Daj } from "component/Date";

const Main = () => {
  // 쿠키에 담긴 정보
  const cookie = new Cookies();
  const Token = cookie.get("token");
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

  // 내가 작성한 게시글
  const myPlace = userPlace?.filter((el) => el.creator === userId);
  const Myuser = userInfo?.find((user) => user.id === userId);
  const BisicImg = Myuser?.image;
  // console.log("게시글", userPlace);
  // 밑에 삼항연산자로 하면 내 작성글과 마이페이지는 이미지가 하나라서 괜찮은데 전체 게시글을 보이는 곳은 안된다
  // 그냥 쿠키에 저장해서 뿌려줄까?
  // 안되면 그냥 지금 req.file.path로 해보고 프로필 이미지 추가 옆에 프로필 이미지 없음 버튼 나둬서
  // 누르면 그냥 기본 이미지 박히게 할까? 근데 이 방법이나 기존의 방법이나 다를게 없는거 같은데?
  // 이미지 선택 안하나 이미지 없음 버튼 만드는 것이나 비슷한거 같다 만약 도전해볼거면
  // 이미지 없읍 버튼 누르면 기본 이미지 박히게 해보자
  // const a =
  //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  // localStorage.setItem("이미지 테스트", a);
  // const c = localStorage.getItem("이미지 테스트");

  const mainCurrent = (index) => {
    setMenu(index);
  };

  //수정을 했지만 쿠키에 저장된 것은 수정 전의 유저 네임이다

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
  console.log("myPlace", myPlace);
  console.log("Myuser", Myuser);
  console.log("userInfo", userInfo);

  useEffect(() => {
    const getPlaceInfo = async () => {
      const res = await getPlaces();
      setUserPlace(res?.data?.places);
    };
    getPlaceInfo();
  }, []);

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
                          {item.creator === userId
                            ? Myuser?.username
                            : item?.username}
                        </s.MapName>
                        <s.MapTime>
                          <Daj createdAt={item.createdAt} />
                        </s.MapTime>
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
                        src={`http://localhost:8000/${Myuser?.image}`}
                        alt="profile"
                      />
                    </s.MapPicture>
                    <s.Info>
                      <div className="info">
                        <s.MapName>{Myuser.username}</s.MapName>

                        <s.MapTime>
                          <Daj createdAt={item.createdAt} />
                        </s.MapTime>
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
