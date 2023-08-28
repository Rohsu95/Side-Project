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
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import * as s from "./style";
import theme from "styles/Theme";
import { updateProfile } from "firebase/auth";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeCookie } from "cookies";
import FormatDate from "component/Date";
import imageCompression from "browser-image-compression";

const Mypage = ({ nweets, user }) => {
  const [menu, setMenu] = useState(0);
  const [img, setImg] = useState([]);

  const [attachment, setAttachment] = useState("");

  const [submit, setSubmit] = useState(false);
  const MypageMenu = [{ name: "My Articles" }];
  const navigate = useNavigate();

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
        // console.log("Error loading image from Firebase Storage.");
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
    const options = {
      maxSizeMB: 0.5, // 최대 파일 크기 (0.5MB)
      fileType: "image/jpeg", // JPEG 형식으로 변환
    };
    try {
      // 이미지 최적화 !!!
      const compressedFile = await imageCompression(theFile, options);
      setAttachment(compressedFile);
      setSubmit(true);

      const reader = new FileReader();
      // 로딩이 끝나면 finishedEvent를 갖는다
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
      };
      //그 후 readAsDataURL을 사용하여 파일 읽기
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
    }
  };

  // img 컬렉션 만들든 후 수정 editor 컬렉션에 수정하여 이미지를 넣어준다
  const onClick = async () => {
    try {
      setSubmit(false);

      let attachmentUrls = user.photoURL;

      const imgRef = collection(dbService, "img");
      const querySnapshot = await getDocs(
        query(imgRef, where("uid", "==", user.uid)),
        orderBy("createdAt", "desc")
      );

      // 이미지 컬렉션
      const imgs = {
        uid: user.uid,
        attachmentUrls,
        createdAt: Date.now(),
      };
      await addDoc(imgRef, imgs);

      if (attachment !== "") {
        if (querySnapshot.docs.length > 0) {
          const docId = querySnapshot.docs[0].id;
          // 스토리지에 만드는 코드
          const fileRef = ref(storageService, `${nweets.id}/${docId}`);
          const response = await uploadString(fileRef, attachment, "data_url");
          attachmentUrls = await getDownloadURL(response.ref);

          // editor 컬렉션 이미지 수정
          for (const nweet of nweets) {
            const edit = {
              attachmentUrls,
            };
            const pageRef = doc(dbService, "editor", `${nweets[0].id}`);
            await updateDoc(pageRef, edit);
          }
        } else {
          const fileRef = ref(storageService, `${nweets.id}/${v4()}`);
          const response = await uploadString(fileRef, attachment, "data_url");
          attachmentUrls = await getDownloadURL(response.ref);
        }
      }
      alert("저장되었습니다.");
      // 사용자 프로필 업데이트
      await updateProfile(user, { photoURL: attachmentUrls });
      setAttachment(attachmentUrls);
      localStorage.setItem("img", attachment);

      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(nweets);
  // 로그아웃
  const logoutBtn = () => {
    removeCookie("token");
    removeCookie("user");
    alert("로그아웃 되었습니다.");
    navigate("/");
    window.location.reload();
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
                    <s.MapTime>
                      <FormatDate date={item.createdAt}></FormatDate>
                    </s.MapTime>
                  </div>
                  <div className="Like">
                    {user && item.uid === user.uid ? (
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
                    {item.tags.length === 0
                      ? ""
                      : item.tags
                          .split(",")
                          .map((tag, index) => <li key={index}>{tag}</li>)}
                  </s.MapUl>
                </s.MapTitle>
              </s.MapContent>
            </s.MainBorder>
          </s.MainMap>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default Mypage;
