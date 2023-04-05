import { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FcLikePlaceholder } from "react-icons/fc";
import { getUser, getWrite } from "../../api/userAPI";
import imgs from "../../profile.jpg";
import * as s from "./style";

const Mypage = () => {
  const [menu, setMenu] = useState(0);
  const [your, setYour] = useState([]);
  const MypageMenu = [{ name: "My Articles" }, { name: "Favorited Articles" }];
  const mypageCurrent = (index) => {
    setMenu(index);
  };

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
  return (
    <div>
      <s.MainImg>
        <h1 className="Containers">이미지</h1>
        <p className="Spans">유저 네임</p>
        <s.Edit>
          <a className="EditA" href="/setting" alt="setting">
            <AiOutlineSetting /> Edit Profile Settings
          </a>
        </s.Edit>
      </s.MainImg>
      <div>
        <s.MainUl>
          {MypageMenu.map((el, index) => {
            return (
              <li key={index}>
                <button
                  className={menu === index ? "Main-item focused" : "Main-item"}
                  onClick={() => mypageCurrent(index)}
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
                      <s.MapTime>2023/03/27</s.MapTime>
                    </div>
                    <div className="Like">
                      <s.MapLike>
                        <FcLikePlaceholder />
                        {/* {item.attributes.like} */}0
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
        <div>Lodding...</div>
      )}
    </div>
  );
};

export default Mypage;
