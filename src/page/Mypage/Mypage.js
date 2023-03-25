import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FcLikePlaceholder } from "react-icons/fc";
import imgs from "../../profile.jpg";
import * as s from "./style";

const Mypage = () => {
  const [menu, setMenu] = useState(0);
  const [your, setYour] = useState([]);
  const MypageMenu = [{ name: "My Articles" }, { name: "Favorited Articles" }];
  const mypageCurrent = (index) => {
    setMenu(index);
  };
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
      {/* {your.length > 0 &&
        your.map((item, key) => ( */}
      {/* <MainMap key={key}> */}
      <s.MainMap>
        <s.MapInfo>
          <s.MapPicture href="/mypage">
            <s.Img src={imgs} alt="profile" />
          </s.MapPicture>
          <s.Info>
            <div className="info">
              <s.MapName href="/mypage">shtngur</s.MapName>
              <s.MapTime>나ㄹ짜 적ㅣ</s.MapTime>
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
            <h1 className="title">{/* {item.attributes.title} */}타이틀</h1>
            <p className="content">
              {/* {item.attributes.content} */}
              내용
            </p>
            <span className="span">Read more...</span>
            <s.MapUl>
              <li>
                {/* {item.attributes.tags} */}
                tags
              </li>
            </s.MapUl>
          </s.MapTitle>
        </s.MapContent>
      </s.MainMap>
      {/* ))} */}
    </div>
  );
};

export default Mypage;
