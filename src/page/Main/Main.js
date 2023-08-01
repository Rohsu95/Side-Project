import React, { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { Cookies } from "react-cookie";
import * as s from "./style";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { dbService } from "fBase";
import { RiDeleteBinLine } from "react-icons/ri";
import theme from "styles/Theme";

const Main = ({ user, nweets, nweets1 }) => {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  // 3가지 menu
  const [menu, setMenu] = useState(0);
  const MainMenu = [{ name: "Global Articles" }, { name: "My Articles" }];
  // 좋아요 기능
  const [like, setLike] = useState([]);
  const [likeStyle, setLikeStyle] = useState({});

  // console.log(nweets);

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
  // 좋아요 기능
  const LikeClick = async (id) => {
    try {
      const pageRef = doc(dbService, "editor", `${id}`);
      const pageDoc = await getDoc(pageRef);
      const currentPage = pageDoc.data();

      // 좋아요 누른 기록이 있는지 확인
      const alreadyLiked = like.find((item) => item.id === id);

      if (alreadyLiked) {
        // 이미 좋아요를 누른 경우
        const newLikes = like.filter((item) => item.id !== id);
        setLike(newLikes);
        setLikeStyle((prev) => ({ ...prev, [id]: false }));
        await updateDoc(pageRef, { like: currentPage.like - 1 });
      } else {
        // 좋아요를 누르지 않은 경우
        const newLikes = [...like, { id, like: 1 }];
        setLike(newLikes);
        setLikeStyle((prev) => ({ ...prev, [id]: true }));
        await updateDoc(pageRef, { like: currentPage.like + 1 });
        // console.log(like);
        // console.log(likeStyle);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  // Firebase Timestamp 객체를 JavaScript Date 객체로 변환 createdAt 변환
  const formatDate = (date) => {
    const jsDate = date.toDate();
    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const day = String(jsDate.getDate()).padStart(2, "0");
    const hours = String(jsDate.getHours()).padStart(2, "0");
    const minutes = String(jsDate.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hours}:${minutes}`;
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

      {nweets1.map((item, key) =>
        user && menu === 0 ? (
          <s.MainMap key={key}>
            <s.MainBorder>
              <s.MapInfo>
                <s.MapPicture>
                  <s.Img src={item?.attachmentUrl} alt="profile" />
                </s.MapPicture>
                <s.Info>
                  <div className="info">
                    <s.MapName>{item.displayName}</s.MapName>
                    <s.MapTime>{formatDate(item.createdAt)}</s.MapTime>
                  </div>
                  <div className="Like">
                    <button
                      value={like}
                      onClick={() => LikeClick(item.id)}
                      className={`basic ${likeStyle[item.id] ? "focus" : ""}`}
                    >
                      <FcLikePlaceholder />

                      {item.like}
                    </button>
                    {user && item.uid === user.uid ? (
                      <s.InfoBtn
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
                      <li key={index}>{[tag]}</li>
                    ))}
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
        nweets && nweets.length > 0 ? (
          nweets.map((item, key) =>
            user && item.uid === user.uid && menu === 1 ? (
              <s.MainMap key={key}>
                <s.MainBorder>
                  <s.MapInfo>
                    <s.MapPicture>
                      {item.attachmentUrl === "" ? (
                        <s.Img
                          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                          alt="profile"
                        />
                      ) : (
                        <s.Img src={item.attachmentUrl} alt="profile" />
                      )}
                    </s.MapPicture>
                    <s.Info>
                      <div className="info">
                        <s.MapName>{item.displayName}</s.MapName>
                        <s.MapTime>{formatDate(item.createdAt)}</s.MapTime>
                      </div>
                      <div className="Like">
                        <button
                          value={like}
                          onClick={() => LikeClick(item.id)}
                          className={`basic ${
                            likeStyle[item.id] ? "focus" : ""
                          }`}
                        >
                          <FcLikePlaceholder />
                          {item.like}
                        </button>
                        {user && item.uid === user.uid ? (
                          <s.InfoBtn
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
                          <li key={index}>{[tag]}</li>
                        ))}
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
