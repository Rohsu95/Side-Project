import React, { useEffect, useState } from "react";
import imgs from "../../profile.jpg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { Cookies } from "react-cookie";
import * as s from "./style";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { authService, dbService } from "fBase";
import Date from "component/Date";

const Main = ({ displayName }) => {
  const cookie = new Cookies();
  // 3가지 menu
  const [menu, setMenu] = useState(0);
  const MainMenu = [{ name: "Your Feed" }, { name: "Global Feed" }];

  const [your, setYour] = useState([]);
  const [like, setLike] = useState(true);

  const [nweets, setNweets] = useState([]);

  // 작성한 글 보여주기
  useEffect(() => {
    const q = query(
      collection(dbService, "editor"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr);
      console.log(nweetArr);
    });
  }, []);

  console.log(nweets);

  const mainCurrent = (index) => {
    setMenu(index);
  };

  const LikeClick = () => {
    if (like === true) {
      setLike(like + 1);
    } else if (like === false) {
      setLike(like - 1);
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

      {nweets && nweets.length > 0 ? (
        nweets.map((item, key) => (
          <s.MainMap key={key}>
            <s.MainBorder>
              <s.MapInfo>
                <s.MapPicture href="/mypage">
                  <s.Img src={imgs} alt="profile" />
                </s.MapPicture>
                <s.Info>
                  <div className="info">
                    <s.MapName href="/mypage">{displayName}</s.MapName>
                    {/* <s.MapTime>{item.createdAt.toMillis()}</s.MapTime> */}
                    <s.MapTime>{formatDate(item.createdAt)}</s.MapTime>
                  </div>
                  <div className="Like">
                    <s.MapLike value={like} onClick={LikeClick}>
                      <FcLikePlaceholder />
                      100
                    </s.MapLike>
                  </div>
                </s.Info>
              </s.MapInfo>
              <s.MapContent>
                <s.MapTitle href={`/detail/${item.id}`}>
                  {/* <s.MapTitle href="/detail"> */}
                  <h1 className="title">{item.title}</h1>
                  <p className="content">{item.content}</p>
                  <span className="span">Read more...</span>
                  <s.MapUl>
                    <li>{item.tags}</li>
                  </s.MapUl>
                </s.MapTitle>
              </s.MapContent>
            </s.MainBorder>
          </s.MainMap>
        ))
      ) : (
        <s.Loading>작성한 글이 없습니다...</s.Loading>
      )}
    </s.MainContainer>
  );
};

export default Main;
