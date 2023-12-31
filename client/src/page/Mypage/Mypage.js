import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import theme from "styles/Theme";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeCookie } from "cookies";
import { Cookies } from "react-cookie";
import { deletePlaces } from "api/placesAPI";
import { Daj } from "component/Date";

const Mypage = ({ userPlace, userInfo }) => {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const userId = cookie.get("userId");

  const [menu, setMenu] = useState(0);

  const MypageMenu = [{ name: "My Articles" }];
  const navigate = useNavigate();

  // 현재 로그인 한 유저 정보
  const Myuser = userInfo?.find((user) => user.id === userId);

  // 메뉴
  const mypageCurrent = (index) => {
    setMenu(index);
  };

  // 작성한 글 삭제
  const onDeletePage = async (id) => {
    if (!window.confirm("삭제 하시겠습니까?")) {
      alert("취소하였습니다.");
    } else {
      await deletePlaces(Token, id);
      window.location.reload();
    }
  };

  // 로그아웃
  const logoutBtn = () => {
    removeCookie("token");
    removeCookie("userId");
    removeCookie("username");
    removeCookie("image");
    alert("로그아웃 되었습니다.");
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <s.MainImg>
        <s.LogOut>
          <span>My Page</span>
          <s.LogOutBtn onClick={() => logoutBtn()}>Log Out</s.LogOutBtn>
        </s.LogOut>
        <s.ImgDiv>
          <img
            className="EditImg"
            src={`${process.env.REACT_APP_BACKEND_URL}/${Myuser?.image}`}
            alt="기본 이미지"
          />
        </s.ImgDiv>
        <p className="Spans">{Myuser?.username}</p>
        <div className="EditDiv">
          <a className="EditA" href={`/setting/${Myuser?.id}`} alt="setting">
            <AiOutlineSetting /> Edit Profile
          </a>
        </div>
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

      {userPlace
        ?.map((item, key) =>
          item.creator === userId ? (
            <s.MainMap key={key}>
              <s.MainBorder>
                <s.MapInfo>
                  <s.MapPicture>
                    <s.Img
                      className="EditImg"
                      src={`${process.env.REACT_APP_BACKEND_URL}/${item?.image}`}
                      alt="수정 이미지"
                    />
                  </s.MapPicture>
                  <s.Info>
                    <div className="info">
                      <s.MapName href="/mypage">{Myuser?.username}</s.MapName>
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
          ) : (
            ""
          )
        )
        .reverse()}
    </div>
  );
};

export default Mypage;
