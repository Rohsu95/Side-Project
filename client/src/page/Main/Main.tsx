import { useState } from "react";
import { Cookies } from "react-cookie";
import * as s from "./style";
import { RiDeleteBinLine } from "react-icons/ri";
import { deletePlaces } from "../../api/placesAPI";
import { Daj } from "../../component/Date";
import { propsType } from "../../types/app";
import theme from "../../styles/Theme";

const Main = ({ userInfo, userPlace }: propsType) => {
  // 쿠키에 담긴 정보
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const userId = cookie.get("userId");

  // 2가지 menu
  const [menu, setMenu] = useState(0);
  const MainMenu = [{ name: "Global Articles" }, { name: "My Articles" }];

  // 내가 작성한 게시글
  const myPlace = userPlace?.filter((el) => el.creator === userId);

  // 현재 로그인 한 유저 정보
  const Myuser = userInfo?.find((user) => user.id === userId);

  const mainCurrent = (index: number) => {
    setMenu(index);
  };

  // 작성한 글 삭제
  const onDeletePage = async (id: string) => {
    if (!window.confirm("삭제 하시겠습니까?")) {
      alert("취소하였습니다.");
    } else {
      await deletePlaces(Token, id);
      window.location.reload();
    }
  };

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
                        src={`${process.env.REACT_APP_BACKEND_URL}/${item?.image}`}
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
                        src={`${process.env.REACT_APP_BACKEND_URL}/${Myuser?.image}`}
                        alt="profile"
                      />
                    </s.MapPicture>
                    <s.Info>
                      <div className="info">
                        <s.MapName>{Myuser?.username}</s.MapName>

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
