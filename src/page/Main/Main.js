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
  const MainMenu = [
    { name: "Your Feed" },
    { name: "Global Feed" },
    { name: "태그 제목" },
  ];
  // axios
  const [global, setGlobal] = useState([]);
  const [your, setYour] = useState([]);
  // 뭐가 작동할 때? 글 쓸 때만 작동이 되야 한다

  // useEffect(() => {
  //   async function getUserWrite() {
  //     try {
  //       const local = localStorage.getItem("token");
  //       // console.log("token", local);
  //       const res = await getUser(local);
  //       setYour(res);
  //       // console.log("your", your); // 여긴 담지 못하고 빈 배열이다
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   getUserWrite();
  // }, []);

  // useEffect(() => {
  //   const getUserReal = async () => {
  //     try {
  //       const local = localStorage.getItem("token");
  //       const res = await getWrite(local);
  //       setYour(res);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getUserReal();
  // }, []);
  useEffect(() => {
    async function getUserData() {
      try {
        const local = localStorage.getItem("token");
        const userInfo = await getUser(local);
        const writeInfo = await getWrite(local);
        const userData = {
          userInfo,
          writeInfo,
        };
        setYour([userData]);
      } catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, []);
  console.log("your정보", your);

  const mainCurrent = (index) => {
    setMenu(index);
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
      {/* 하나씩은 불러와지는데 전체로 불러올려면 [0]이렇게 하면 안되고 다른 방법을 찾아봐야겠다 */}
      {your && your.length > 0 ? (
        your.map((item, key) => (
          <s.MainMap key={key}>
            <s.MapInfo>
              <s.MapPicture href="/mypage">
                <s.Img src={imgs} alt="profile" />
              </s.MapPicture>
              <s.Info>
                <div className="info">
                  <s.MapName href="/mypage">{item.userInfo.username}</s.MapName>
                  <s.MapTime>
                    {item?.writeInfo?.data[2]?.attributes?.createdAt}
                  </s.MapTime>
                </div>
                <div className="Like">
                  <s.MapLike>
                    <FcLikePlaceholder />
                    {/* {item.attributes.like} */}
                  </s.MapLike>
                </div>
              </s.Info>
            </s.MapInfo>
            <s.MapContent>
              <s.MapTitle href="/detail">
                <h1 className="title">
                  {item?.writeInfo?.data[2]?.attributes?.title}
                </h1>
                <p className="content">
                  {item?.writeInfo?.data[2]?.attributes?.content}
                </p>
                <span className="span">Read more...</span>
                <s.MapUl>
                  <li>{item?.writeInfo?.data[2]?.attributes?.tags}</li>
                </s.MapUl>
              </s.MapTitle>
            </s.MapContent>
          </s.MainMap>
        ))
      ) : (
        <div>Loading...</div>
      )}
      {/* <div>
        <div>Popular Tags</div>
      </div> */}
    </s.MainContainer>
  );
};

export default Main;
