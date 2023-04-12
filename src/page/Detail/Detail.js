import React, { useEffect, useState } from "react";
import imgs from "../../profile.jpg";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import * as s from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { dbService } from "fBase";

const Detail = ({ displayName, uid }) => {
  // 페이지 정보
  const [commentInput, setCommentInput] = useState("");
  // 만든 정보 불러오기
  const [page, setPage] = useState(1); // 현재 페이지 번호
  // 댓글
  const [comment, setComment] = useState([]);
  // 전체 불러오기
  const [nweets, setNweets] = useState([]);
  const navigate = useNavigate();
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const { id } = useParams();
  // 특정 게시물 불러오기
  const [data, setData] = useState(null);

  // 특정 게시물 페이지 불러오기 id
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

      setComment(nweetArrs);
    });
  }, []);

  const onCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  // 댓글 삭제
  const onDeleteComment = async (id) => {
    const ok = window.confirm("댓글을 삭제 하시겠습니까?");
    if (ok) {
      const commentRef = doc(dbService, "test", id);
      await deleteDoc(commentRef);
    }
  };

  const CommentonClick = async () => {
    const now = new Date(Date.now());

    try {
      const sweetObj = {
        displayName: displayName,
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
                    <s.DetailName href="/mypage">
                      {data.displayName}
                    </s.DetailName>
                    <s.DetailDate>{formatDate(data.createdAt)}</s.DetailDate>
                  </div>
                  <s.InfoBtn
                    border="#ccc"
                    color="#ccc"
                    hover="#282A3A"
                    hover_color="white"
                    margin="0.5rem"
                    onClick={() => navigate("/edit")}
                  >
                    <CiEdit />
                    Edit Article
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
      {/* 댓글 창  */}
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
            <div className="commentName">
              <s.DetailImg
                src={imgs}
                alt="이미지"
                margin="1.25rem"
                width_hover="28px"
                height_hover="28px"
              />
              <span>{displayName}</span>
            </div>
            <s.CommentBtn onClick={CommentonClick}>Comment</s.CommentBtn>
          </s.CommentPost>
        </s.CommentText>
      </s.CommentContainer>
      {/* 댓글 내용 부분 */}
      <s.CcommentContainer>
        <div>
          {comment.map((item, key) => (
            <s.CcommentTitle key={key}>
              <s.CcommentDiv>
                <p>{item.comment}</p>
              </s.CcommentDiv>
              <s.CommentPost>
                <div className="commentName">
                  <s.DetailImg
                    src={imgs}
                    alt="이미지"
                    margin="1.25rem"
                    width="24px"
                    height="24px"
                    width_hover="28px"
                    height_hover="28px"
                  />
                  <span>{item.displayName}</span>
                </div>

                <s.CcommentDelete onClick={() => onDeleteComment(item.id)}>
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
