import { removeCookie } from "Cookies";
import { dbService, storageService } from "fBase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import * as s from "./style";
import { updateProfile } from "firebase/auth";
import theme from "styles/Theme";
import { RiDeleteBinLine } from "react-icons/ri";

const Mypage = ({ nweets, user }) => {
  const [menu, setMenu] = useState(0);
  const [img, setImg] = useState([]);

  const [attachment, setAttachment] = useState("");

  const [submit, setSubmit] = useState(false);
  const MypageMenu = [{ name: "My Articles" }, { name: "Favorited Articles" }];
  const navigate = useNavigate();

  // 좋아요 기능
  const [like, setLike] = useState([]);
  const [likeStyle, setLikeStyle] = useState({});
  // 메뉴
  const mypageCurrent = (index) => {
    setMenu(index);
  };

  const attachmentUrl = localStorage.getItem("img");
  //Firebase Storage에서 가져온 이미지 파일을 attachmentUrl에 넣은 후 랜더링한다
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
    alert("저장되었습니다.");

    try {
      const imgRef = collection(dbService, "img");
      const querySnapshot = await getDocs(
        query(imgRef, where("uid", "==", user.uid)),
        orderBy("createdAt", "desc")
      );
      let attachmentUrl = user.photoURL;

      if (attachment !== "") {
        if (querySnapshot.docs.length > 0) {
          const docId = querySnapshot.docs[0].id;
          // 스토리지에 만드는 코드
          const fileRef = ref(storageService, `${nweets.id}/${docId}`);
          const response = await uploadString(fileRef, attachment, "data_url");
          attachmentUrl = await getDownloadURL(response.ref);

          // editor 컬렉션 이미지 수정
          const edit = {
            attachmentUrl: user.photoURL,
          };
          const pageRef = doc(dbService, "editor", `${nweets[0].id}`);
          await updateDoc(pageRef, edit);
        } else {
          const fileRef = ref(storageService, `${nweets.id}/${v4()}`);
          const response = await uploadString(fileRef, attachment, "data_url");
          attachmentUrl = await getDownloadURL(response.ref);

          const imgs = {
            uid: user.uid,
            attachmentUrl,
            createdAt: Date.now(),
          };
          await addDoc(imgRef, imgs);
        }
      }
      await updateProfile(user, { photoURL: attachmentUrl });
      localStorage.setItem("img", attachment);
      // alert("저장되었습니다."); 원래 여기 있었는데 위로 올림
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user);
  console.log(nweets);

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
        console.log(like);
        console.log(likeStyle);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onDeletePage = async (id) => {
    const ok = window.confirm("삭제 하시겠습니까?");
    if (ok) {
      const pageRef = doc(dbService, "editor", `${id}`);
      await deleteDoc(pageRef);
    }
  };
  return (
    <div>
      <s.MainImg>
        <s.LogOut>
          <s.LogOutBtn onClick={logoutBtn}>Log Out</s.LogOutBtn>
        </s.LogOut>
        <s.ImgDiv>
          {submit === true ? (
            <img className="EditImg" src={attachment} alt="수정 이미지" />
          ) : "" || user?.uid === img?.uid ? (
            <img className="EditImg" src={attachmentUrl} alt="수정 이미지" />
          ) : (
            <img className="EditImg" src={user.photoURL} alt="기본 이미지" />
          )}
        </s.ImgDiv>
        <p className="Spans">{user?.displayName}</p>
        <s.Edit>
          {/* label for이랑 input id를 같이 맞추면 커스터마이징이 되어 라벨이 인풋 기능을 한다 */}
          <label htmlFor="input-file" className="label-file">
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

      {nweets.map((item, key) =>
        user && item.uid === user.uid ? (
          <s.MainMap key={key}>
            <s.MainBorder>
              <s.MapInfo>
                <s.MapPicture href="/mypage">
                  {user?.uid === img?.uid ? (
                    <s.Img
                      className="EditImg"
                      src={attachmentUrl}
                      alt="수정 이미지"
                    />
                  ) : (
                    <s.Img
                      className="EditImg"
                      src={user.photoURL}
                      alt="기본 이미지"
                    />
                  )}
                </s.MapPicture>
                <s.Info>
                  <div className="info">
                    <s.MapName href="/mypage">{user?.displayName}</s.MapName>
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
                <s.MapTitle href="/detail">
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
      {/* ) : (
        <div>Lodding...</div>
      )} */}
    </div>
  );
};

export default Mypage;
