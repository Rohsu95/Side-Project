import React, { useEffect, useState } from "react";
import imgs from "../../profile.jpg";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { getUser, getWrite } from "../../api/userAPI";
import { Cookies, useCookies } from "react-cookie";
import * as s from "./style";

const Main = () => {
  const cookie = new Cookies();
  // 3가지 menu
  const [menu, setMenu] = useState(0);
  const MainMenu = [{ name: "Your Feed" }, { name: "Global Feed" }];
  // axios
  const [global, setGlobal] = useState([]);
  const [your, setYour] = useState([]);
  const [like, setLike] = useState(true);

  // useEffect(() => {
  //   async function getUserData() {
  //     try {
  //       const local = localStorage.getItem("token");
  //       if (local) {
  //         const userInfo = await getUser(local);
  //         const writeInfo = await getWrite(local);

  //         const userData = {
  //           userInfo,
  //           writeInfo,
  //         };
  //         setYour([userData]);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getUserData();
  // }, []);
  console.log("your정보", your);

  const mainCurrent = (index) => {
    setMenu(index);
  };
  // 클릭시 +1 이 되며 +1이 유지가 될려면 data에 넣어야 겠다 유저에 넣어야하나 ?
  // 내가 눌렀으면 색이 변화한다 삼항연산자로 클릭시 스타일을 줄까?
  const LikeClick = () => {
    if (like === true) {
      setLike(like + 1);
    } else if (like === false) {
      setLike(like - 1);
    }
  };
  console.log(like);
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

      {your && your.length > 0 ? (
        your.map((item, key) => (
          <s.MainMap key={key}>
            {item.writeInfo.data.map((writeItem, writeKey) => (
              <s.MainBorder key={writeKey}>
                <s.MapInfo>
                  <s.MapPicture href="/mypage">
                    <s.Img src={imgs} alt="profile" />
                  </s.MapPicture>
                  <s.Info>
                    <div className="info">
                      <s.MapName href="/mypage">
                        {item?.userInfo?.username}
                      </s.MapName>
                      <s.MapTime>
                        2022
                        {writeItem.attributes?.createdAt}
                      </s.MapTime>
                    </div>
                    <div className="Like">
                      <s.MapLike value={like} onClick={LikeClick}>
                        <FcLikePlaceholder />
                        {writeItem.attributes?.like}
                      </s.MapLike>
                    </div>
                  </s.Info>
                </s.MapInfo>
                <s.MapContent>
                  <s.MapTitle href="/detail">
                    <h1 className="title">{writeItem.attributes?.title}</h1>
                    <p className="content">{writeItem.attributes?.content}</p>
                    <span className="span">Read more...</span>
                    <s.MapUl>
                      <li>{writeItem.attributes?.tags}</li>
                    </s.MapUl>
                  </s.MapTitle>
                </s.MapContent>
              </s.MainBorder>
            ))}
          </s.MainMap>
        ))
      ) : (
        <s.Loading>작성한 글이 없습니다...</s.Loading>
      )}
    </s.MainContainer>
  );
};

export default Main;
