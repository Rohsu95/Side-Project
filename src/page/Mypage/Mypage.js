import { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FcLikePlaceholder } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import theme from "styles/Theme";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeCookie } from "cookies";
import FormatDate from "component/Date";
import imageCompression from "browser-image-compression";
import { Cookies } from "react-cookie";
import { deletePlaces } from "api/writingAPI";
import axios from "axios";

const Mypage = ({ userPlace, userInfo }) => {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const userId = cookie.get("userId");

  const [menu, setMenu] = useState(0);
  const [img, setImg] = useState([]);

  const [attachment, setAttachment] = useState("");

  const [submit, setSubmit] = useState(true);
  const MypageMenu = [{ name: "My Articles" }];
  const navigate = useNavigate();

  const Myuser = userInfo?.find((user) => user.id === userId);
  console.log("내 정보", Myuser);
  console.log("게시글", userPlace);

  // 메뉴
  const mypageCurrent = (index) => {
    setMenu(index);
  };

  const attachmentUrl = localStorage.getItem("img");

  //Firebase Storage에서 가져온 이미지 파일을 attachmentUrl에 넣은 후 랜더링한다
  // useEffect(() => {
  //   if (attachmentUrl) {
  //     const img = new Image();
  //     img.src = attachmentUrl;
  //     img.onload = () => {
  //       setAttachment(attachmentUrl);
  //     };
  //     img.onerror = () => {
  //       // console.log("Error loading image from Firebase Storage.");
  //     };
  //   }
  // }, []);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

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

  // // img 컬렉션 만들든 후 수정 editor 컬렉션에 수정하여 이미지를 넣어준다

  // const onClick = async () => {
  //   try {
  //     setSubmit(false);

  //     let attachmentUrls = user.photoURL;

  //     const imgRef = collection(dbService, "img");
  //     const querySnapshot = await getDocs(
  //       query(imgRef, where("uid", "==", user.uid)),
  //       orderBy("createdAt", "desc")
  //     );

  //     // 이미지 컬렉션
  //     const imgs = {
  //       uid: user.uid,
  //       attachmentUrls,
  //       createdAt: Date.now(),
  //     };
  //     await addDoc(imgRef, imgs);

  //     if (attachment !== "") {
  //       if (querySnapshot.docs.length > 0) {
  //         const docId = querySnapshot.docs[0].id;
  //         // 스토리지에 만드는 코드
  //         const fileRef = ref(storageService, `${nweets.id}/${docId}`);
  //         const response = await uploadString(fileRef, attachment, "data_url");
  //         attachmentUrls = await getDownloadURL(response.ref);

  //         // editor 컬렉션 이미지 수정
  //         for (const nweet of nweets) {
  //           const edit = {
  //             attachmentUrls,
  //           };
  //           const pageRef = doc(dbService, "editor", `${nweets[0].id}`);
  //           await updateDoc(pageRef, edit);
  //         }
  //       } else {
  //         const fileRef = ref(storageService, `${nweets.id}/${v4()}`);
  //         const response = await uploadString(fileRef, attachment, "data_url");
  //         attachmentUrls = await getDownloadURL(response.ref);
  //       }
  //     }
  //     alert("저장되었습니다.");
  //     // 사용자 프로필 업데이트
  //     await updateProfile(user, { photoURL: attachmentUrls });
  //     setAttachment(attachmentUrls);
  //     localStorage.setItem("img", attachment);

  //     // window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
    alert("로그아웃 되었습니다.");
    navigate("/");
  };
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // 오전에 이미지 겟 이 안되는데 지피티로 물어보고 근데 ㅈ디비에 저장이 안되니 안나오는 것일수도 있다.
  // 온챈지 미리보기 구글링으로 한 번더 찾아보기 그 후 안되면 지피티 물어보고 오후까지 하고 저녁엔 겟앰 잠깐 하고
  // 그 때 까지 이미지 안되면 그냥 기본 이미지만 넣기 그 후 페이지 마다 확인하고 콘솔 지우고 늦어도 토욜 부터는 배포 작업 하기
  // 아 그 전에 커밋 메시지 어캐 해야할지 찾아보기

  // 이미지 업로드
  const handleUpload = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("avatar", file);

    axios
      .post("http://localhost:8000/api/users/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Upload 성공");
      })
      .catch((error) => {
        console.error("Upload 실패:", error);
      });
  };
  return (
    <div>
      <s.MainImg>
        <s.LogOut>
          <s.LogOutBtn onClick={logoutBtn}>Log Out</s.LogOutBtn>
        </s.LogOut>
        <s.ImgDiv>
          <img className="EditImg" src={Myuser.image} alt="기본 이미지" />
          {/* {submit === true ? (
            <img className="EditImg" src={attachment} alt="수정 이미지" />
          ) : "" || user?.uid === img?.uid ? (
            <img className="EditImg" src={attachmentUrl} alt="수정 이미지" />
          ) : (
            <img className="EditImg" src={user.photoURL} alt="기본 이미지" />
          )} */}
        </s.ImgDiv>
        <p className="Spans">{Myuser?.username}</p>

        <form
          action="/upload"
          encType="multipart/form-data"
          onSubmit={handleUpload}
        >
          {/* <form onSubmit={handleUpload}> */}
          <input type="file" name="avatar" onChange={onFileChange} />
          <input type="submit" />
        </form>
        {/* <s.Edit>
            <label htmlFor="input-file" className="label-file">
              업로드
            </label>
            <input
              type="file"
              id="input-file"
              accept="image/*"
              name="image"
              // onChange={onFileChange}
              style={{ display: "none" }}
            />
            {submit ? (
              <button className="submit">
                {/* <button onClick={onClick} className="submit"> */}
        {/* 저장
              </button>
            ) : (
              ""
            )}
            <a className="EditA" href={`/setting/${userId}`} alt="setting">
              <AiOutlineSetting /> Edit Profile
            </a>
          </s.Edit>  */}
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
        .map((item, key) =>
          item.creator === userId ? (
            <s.MainMap key={key}>
              <s.MainBorder>
                <s.MapInfo>
                  <s.MapPicture>
                    이미지
                    {/* {user?.uid === img?.uid ? (
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
                  )} */}
                  </s.MapPicture>
                  <s.Info>
                    <div className="info">
                      <s.MapName href="/mypage">{Myuser.username}</s.MapName>
                      <s.MapTime>
                        {item.createdAt}
                        {/* <FormatDate date={item.createdAt}></FormatDate> */}
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
