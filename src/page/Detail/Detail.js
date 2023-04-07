import React, { useEffect, useState } from "react";
import imgs from "../../profile.jpg";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import * as s from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { deleteWrite, getUser, getWrite } from "../../api/userAPI";
import { Cookies } from "react-cookie";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { dbService } from "fBase";

const Detail = ({ displayName }) => {
  // 만들기
  const [commentInput, setCommentInput] = useState("");
  // 만든 정보 불러오기
  const [comment, setComment] = useState([]);
  const [your, setYour] = useState([]);
  const [nweets, setNweets] = useState([]);
  const navigate = useNavigate();
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const { id } = useParams();

  const [data, setData] = useState(null);

  // 특정 게시물 페이지 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(dbService, "editor", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    fetchData();
  }, [id]);
  // read 특정 게시물 정보 보여주기
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
  // read 댓글 정보 보여주기
  // useEffect(() => {
  //   onSnapshot(query(collection(dbService, "test")), (docs) => {
  //     const dataArr = [];
  //     docs.forEach((doc) => {
  //       dataArr.push(doc.data());
  //     });
  //     setComment([...dataArr]);
  //   });
  // }, []);
  // 애도 작동함
  // useEffect(() => {
  //   const q = query(
  //     collection(dbService, "test"),
  //     orderBy("createdAt", "desc")
  //   );
  //   onSnapshot(q, (querySnapshot) => {
  //     const dataArr = [];
  //     querySnapshot.forEach((doc) => {
  //       dataArr.push(doc.data());
  //     });
  //     setComment([...dataArr]);
  //   });
  // }, []);
  //애도 작동 정렬은안됌
  useEffect(() => {
    const q = query(
      collection(dbService, "test"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArrs = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      console.log(nweetArrs);
      console.log(snapshot.docs);
      setComment(nweetArrs);
    });
  }, []);

  const onCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  console.log("빈 배열", comment);

  const DeleteClick = async () => {
    if (!window.confirm("정말 삭제 하시겠습니까?")) {
      alert("취소했습니다.");
    } else {
      await deleteWrite(Token, id);
      navigate("/");
    }
  };

  const CommentonClick = async () => {
    const now = new Date(Date.now());

    try {
      const sweetObj = {
        comment: commentInput,
        createdAt: Timestamp.fromDate(now),
      };
      await addDoc(collection(dbService, "test"), sweetObj);
      setCommentInput("");
    } catch (error) {
      console.log(error);
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
    <s.Container>
      {data ? (
        <div>
          <s.DetailContainer>
            <div className="info">
              <h1>{data.title}</h1>
              <s.DetailInfo>
                <div className="detailLine">
                  <s.DetailA to="/mypage">
                    <s.DetailImg src={imgs} alt="이미지" />
                  </s.DetailA>
                  <div className="name">
                    <s.DetailName href="/mypage">{displayName}</s.DetailName>
                    <s.DetailDate>{formatDate(data.createdAt)}</s.DetailDate>
                  </div>
                  <s.InfoBtn
                    border="#ccc"
                    color="#ccc"
                    hover="#282A3A"
                    hover_color="white"
                    margin="0.5rem"
                    onClick={() => navigate("/setting")}
                  >
                    <CiEdit />
                    Edit Article
                  </s.InfoBtn>
                  <s.InfoBtn
                    border="#A86464"
                    color="#A86464"
                    hover="#A84448"
                    hover_color="white"
                    onClick={DeleteClick}
                  >
                    <RiDeleteBinLine />
                    Delete Article
                  </s.InfoBtn>
                </div>
              </s.DetailInfo>
            </div>
          </s.DetailContainer>
          <s.DetailContent>
            <div>{data.content}</div>
            <s.DetailTag>
              <li>{data.tags}</li>
            </s.DetailTag>
          </s.DetailContent>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <s.CommentContainer>
        <s.CommentText>
          <textarea
            value={commentInput}
            onChange={onCommentChange}
            className="textArea"
            type="text"
            name="commentInput"
            placeholder="Write a comment..."
          />
          <s.CommentPost>
            <s.DetailImg
              src={imgs}
              alt="이미지"
              margin="1.25rem"
              width_hover="28px"
              height_hover="28px"
            />
            <s.CommentBtn onClick={CommentonClick}>Post Comment</s.CommentBtn>
          </s.CommentPost>
        </s.CommentText>
      </s.CommentContainer>
      {/* 댓글 부분 */}
      <s.CcommentContainer>
        <div>
          {comment.map((item, key) => (
            <s.CcommentTitle key={key}>
              <s.CcommentDiv>
                <p>{item.comment}</p>
              </s.CcommentDiv>
              <s.CommentPost>
                <s.DetailImg
                  src={imgs}
                  alt="이미지"
                  margin="1.25rem"
                  width="24px"
                  height="24px"
                  width_hover="28px"
                  height_hover="28px"
                />
                <s.CcommentDelete>
                  <RiDeleteBinLine />
                </s.CcommentDelete>
              </s.CommentPost>
            </s.CcommentTitle>
          ))}
        </div>
      </s.CcommentContainer>
    </s.Container>
  );
};

// RiDeleteBinLine;

export default Detail;
