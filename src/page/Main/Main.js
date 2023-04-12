import React, { useEffect, useState } from "react";
import imgs from "../../profile.jpg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { Cookies } from "react-cookie";
import * as s from "./style";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { authService, dbService } from "fBase";
import Date from "component/Date";
import { RiDeleteBinLine } from "react-icons/ri";
import theme from "styles/Theme";

const Main = ({ displayName, uids, user }) => {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  // 3가지 menu
  const [menu, setMenu] = useState(0);
  const MainMenu = [{ name: "Global Articles" }, { name: "My Articles" }];
  const IconImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [trash, setTrash] = useState(false);
  // const [uuid, setUuid] = useState(uids);
  const [like, setLike] = useState(true);
  const [nweets, setNweets] = useState([]);
  const [nweets1, setNweets1] = useState([]);
  const [img, setImg] = useState([]);

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
      setNweets1(nweetArr);
    });
  }, []);

  console.log(nweets);
  console.log(user);
  // 3.내가 쓴글만 보이게 할지,세팅 페이지 할지 고민
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

      {nweets1.map((item, key) =>
        user && menu === 0 ? (
          <s.MainMap key={key}>
            <s.MainBorder>
              <s.MapInfo>
                <s.MapPicture href="/mypage">
                  {item.attachmentUrl === "" ? (
                    <s.Img src={IconImg} alt="profile" />
                  ) : (
                    <s.Img src={item.attachmentUrl} alt="profile" />
                  )}
                </s.MapPicture>
                <s.Info>
                  <div className="info">
                    <s.MapName href="/mypage">{item.displayName}</s.MapName>
                    {/* <s.MapTime>{item.createdAt.toMillis()}</s.MapTime> */}
                    <s.MapTime>{formatDate(item.createdAt)}</s.MapTime>
                  </div>
                  <div className="Like">
                    <s.MapLike value={like}>
                      <FcLikePlaceholder />
                      100
                    </s.MapLike>
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
                    <li>{item.tags}</li>
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
                    <s.MapPicture href="/mypage">
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
                        <s.MapName href="/mypage">{item.displayName}</s.MapName>
                        {/* <s.MapTime>{item.createdAt.toMillis()}</s.MapTime> */}
                        <s.MapTime>{formatDate(item.createdAt)}</s.MapTime>
                      </div>
                      <div className="Like">
                        <s.MapLike value={like}>
                          <FcLikePlaceholder />
                          100
                        </s.MapLike>
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
                        <li>{item.tags}</li>
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
