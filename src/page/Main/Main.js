import React, { useState } from "react";
import { Cookies } from "react-cookie";
import * as s from "./style";
import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "fBase";
import { RiDeleteBinLine } from "react-icons/ri";
import theme from "styles/Theme";
import FormatDate from "component/Date";

const Main = ({ user, nweets }) => {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  // 2가지 menu
  const [menu, setMenu] = useState(0);
  const MainMenu = [{ name: "Global Articles" }, { name: "My Articles" }];

  const mainCurrent = (index) => {
    setMenu(index);
  };

  // 선택 삭제
  const onDeletePage = async (id) => {
    const ok = window.confirm("삭제 하시겠습니까?");
    if (ok) {
      const pageRef = doc(dbService, "editor", `${id}`);
      await deleteDoc(pageRef);
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

      {nweets.map((item, key) =>
        menu === 0 ? (
          <s.MainMap key={key}>
            <s.MainBorder>
              <s.MapInfo>
                <s.MapPicture>
                  <s.Img
                    key={item.id}
                    src={
                      item.uid === user.uid
                        ? user?.photoURL
                        : item?.attachmentUrl
                    }
                    alt="profile"
                  />
                </s.MapPicture>
                <s.Info>
                  <div className="info">
                    <s.MapName>{item.displayName}</s.MapName>
                    <s.MapTime>
                      <FormatDate date={item.createdAt}></FormatDate>
                    </s.MapTime>
                  </div>
                  <div className="Like">
                    {Token && item.uid === user.uid ? (
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
                    {item.tags.length === 0
                      ? ""
                      : item.tags
                          .split(",")
                          .map((tag, index) => <li key={index}>{tag}</li>)}
                  </s.MapUl>
                </s.MapTitle>
              </s.MapContent>
            </s.MainBorder>
          </s.MainMap>
        ) : (
          ""
        )
      )}
      {Token !== undefined ? (
        nweets ? (
          nweets.map((item, key) =>
            user && item.uid === user.uid && menu === 1 ? (
              <s.MainMap key={key}>
                <s.MainBorder>
                  <s.MapInfo>
                    <s.MapPicture>
                      <s.Img
                        key={item.id}
                        src={
                          item.uid === user.uid
                            ? user?.photoURL
                            : item?.attachmentUrl
                        }
                        alt="profile"
                      />
                    </s.MapPicture>
                    <s.Info>
                      <div className="info">
                        <s.MapName>{item.displayName}</s.MapName>
                        <s.MapTime>
                          <FormatDate date={item.createdAt} />
                        </s.MapTime>
                      </div>
                      <div className="Like">
                        {user && item.uid === user.uid ? (
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
                        {item.tags.length === 0
                          ? ""
                          : item.tags
                              .split(",")
                              .map((tag, index) => <li key={index}>{tag}</li>)}
                      </s.MapUl>
                    </s.MapTitle>
                  </s.MapContent>
                </s.MainBorder>
              </s.MainMap>
            ) : (
              ""
            )
          )
        ) : (
          <s.Loading>작성한 글이 없습니다...</s.Loading>
        )
      ) : (
        <s.Loading>로그인을 해주세요...</s.Loading>
      )}
    </s.MainContainer>
  );
};

export default Main;
