import { async } from "@firebase/util";
import { removeCookie } from "Cookies";
import { dbService, storageService } from "fBase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FcLikePlaceholder } from "react-icons/fc";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import imgs from "../../profile.jpg";
import * as s from "./style";

const Mypage = ({ displayName, user, imageUrl }) => {
  const [menu, setMenu] = useState(0);
  const [img, setImg] = useState([]);
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  const [submit, setSubmit] = useState(false);
  const MypageMenu = [{ name: "My Articles" }, { name: "Favorited Articles" }];
  const navigate = useNavigate();
  const IconImg =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  const mypageCurrent = (index) => {
    setMenu(index);
  };

  // editor 컬렉션 내용을 불러온다
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
    });
  }, []);

  // img 컬렉션 내용을 불러온다
  useEffect(() => {
    const q = query(
      collection(dbService, "img"),
      // createdAt이 없다면 빈 배열이 나온다
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setImg(nweetArr);
    });
  }, []);
  // console.log("등록한 정보", nweets);
  console.log("이미지 정보", img);
  console.log("로그인 정보", user);

  const attachmentUrl = localStorage.getItem("attachmentUrl");

  useEffect(() => {
    if (attachmentUrl) {
      const img = new Image();
      img.src = attachmentUrl;
      img.onload = () => {
        setAttachment(attachmentUrl);
      };
      img.onerror = () => {
        console.log("Error loading image from Firebase Storage.");
      };
    }
  }, []);

  // 화면에 이미지 보이기
  const onFileChange = async (event) => {
    const {
      target: { files },
    } = event;
    // 파일을 갖고 reader 만든다 0은 첫번째 파일만 갖는다
    const theFile = files[0];
    const reader = new FileReader();
    // 로딩이 끝나면 finishedEvent를 갖는다
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    //그 후 readAsDataURL을 사용하여 파일 읽기
    reader.readAsDataURL(theFile);
    setSubmit(true);
  };

  // img 컬렉션 만들든 후 수정 editor 컬렉션에 수정하여 이미지를 넣어준다
  const onClick = async (event) => {
    setSubmit(false);
    try {
      let attachmentUrl = "";
      if (attachment !== "") {
        const fileRef = ref(storageService, `${nweets.id}/${v4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(response.ref);
        localStorage.setItem("attachmentUrl", attachmentUrl);
      }

      // nweetObj 컬렉션 만든 후 이미지 넣기
      const imgs = {
        uid: user.uid,
        attachmentUrl: attachmentUrl,
        createdAt: Date.now(),
      };
      await addDoc(collection(dbService, "img"), imgs);
      alert("저장되었습니다.");
      // editor 컬렉션 이미지 수정
      const edit = {
        attachmentUrl: attachmentUrl,
      };
      const pageRef = doc(dbService, "editor", `${nweets[0].id}`);
      await updateDoc(pageRef, edit);
    } catch (err) {
      console.log(err);
    }
  };

  // 로그아웃
  const logoutBtn = () => {
    removeCookie("token");
    navigate("/");
    window.location.reload();
  };
  // 날짜
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
    <div>
      <s.MainImg>
        <s.LogOut>
          <s.LogOutBtn onClick={logoutBtn}>Log Out</s.LogOutBtn>
        </s.LogOut>
        <s.ImgDiv>
          {nweets.attachmentUrl !== 0 ? (
            <img className="EditImg" src={attachmentUrl} alt="수정 이미지" />
          ) : (
            <img className="EditImg" src={IconImg} alt="기본 이미지" />
          )}
          {/* className="EditImg" */}
        </s.ImgDiv>
        <p className="Spans">{displayName}</p>
        <s.Edit>
          {/* label for이랑 input id를 같이 맞추면 커스터마이징이 되어 라벨이 인풋 기능을 한다 */}
          <label for="input-file" className="label-file">
            업로드
          </label>
          <input
            type="file"
            id="input-file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: "none" }}
          />
          {submit ? (
            <button onClick={onClick} className="submit">
              저장
            </button>
          ) : (
            ""
          )}
          <a className="EditA" href="/setting" alt="setting">
            <AiOutlineSetting /> Edit Profile
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
      {/* 유저에 있는 정보를 넣던가 아니면 로컬에 있는 정보를 넣던가   */}
      {nweets.map((item, key) =>
        user && item.uid === user.uid ? (
          <s.MainMap key={key}>
            <s.MainBorder>
              <s.MapInfo>
                <s.MapPicture href="/mypage">
                  {item.attachmentUrl.length !== 0 ? (
                    <s.Img
                      className="EditImg"
                      src={attachmentUrl}
                      alt="수정 이미지"
                    />
                  ) : (
                    <img className="icon" src={IconImg} alt="기본 이미지" />
                  )}

                  {/* {item.uid === user.uid && item.attachmentUrl.length === [] ? (
                    <s.Img
                      className="EditImg"
                      src={item.attachmentUrl}
                      alt="수정 이미지"
                    ></s.Img>
                  ) : (
                    <BsPerson className="icon" />
                  )} */}
                </s.MapPicture>
                <s.Info>
                  <div className="info">
                    <s.MapName href="/mypage">{item.displayName}</s.MapName>
                    <s.MapTime>{formatDate(item.createdAt)}</s.MapTime>
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
      {/* ) : (
        <div>Lodding...</div>
      )} */}
    </div>
  );
};

export default Mypage;
