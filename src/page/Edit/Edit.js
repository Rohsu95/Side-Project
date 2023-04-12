import axios from "axios";

import { dbService } from "fBase";
import { updateCurrentUser } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../Cookies";
import * as s from "./style";

const Edit = ({ displayName, uid }) => {
  // 수정 할 정보 불러오기
  const [nweets, setNweets] = useState([]);
  // 수정 후 불러오기
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [input, setInput] = useState({
    title: "",
    content: "",
    article: "",
  });
  const [like, setLike] = useState(0);
  // 수정 부분
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const { title, content, article } = input;

  const onTotal = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
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
      setInput({
        title: nweetArr[0]?.title,
        content: nweetArr[0]?.content,
        article: nweetArr[0]?.article,
      });
      setTags(nweetArr[0]?.tags);
      console.log(nweetArr);
    });
  }, []);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      onItem();
    }
  };
  const onItem = () => {
    let updataed = [...tagsList];
    updataed.push(tags);
    setTagsList(updataed);
    setTags("");
  };
  // 유어 클래스 모달에 태그가 있을것이다 확인해보자 아니면 axios로 삭제 통신 만들기도 있다
  const onDelete = (id) => {
    setTagsList((tagsList) => tagsList.filter((el) => el !== id));
  };

  const onClick = async (id) => {
    let tagsitem = String(tagsList);
    const now = new Date(Date.now());

    try {
      const editor = {
        title: title,
        content: content,
        article: article,
        tags: tagsitem,
        like: like,
        // createdAt: Timestamp.fromDate(now),
        displayName: displayName,
        uid: uid,
      };
      const pageRef = doc(dbService, "editor", `${nweets[0].id}`);
      await updateDoc(pageRef, editor);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // const toggleEditing = () => setEditing((prev) => !prev);
  return (
    <s.EditorContainer>
      <div>
        <s.TitleInput
          type="text"
          name="title"
          value={title}
          onChange={onTotal}
          // onChange={(e) => setTitle(e.target.value)}
          placeholder="Article Title"
        />
        <s.ArticleInput
          type="text"
          name="article"
          value={article}
          onChange={onTotal}
          // onChange={(e) => setArticle(e.target.value)}
          placeholder="What's this article about"
        />
        <s.ContentArea
          type="text"
          name="content"
          value={content}
          onChange={onTotal}
          // onChange={(e) => setContent(e.target.value)}
          placeholder="Write your article (in markdown)"
        />
        <s.TagInput
          type="text"
          name="tags"
          value={tags}
          // onChange={TagsChange}
          onChange={(e) => setTags(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Enter tags"
        />
        <s.TagDiv>
          {tagsList.map((el, id) => (
            <s.TagSpan key={id}>
              <s.TagDelete onClick={onDelete}>X</s.TagDelete>
              {el}
            </s.TagSpan>
          ))}
        </s.TagDiv>
        <s.EditorBtn onClick={onClick}>Article Modify</s.EditorBtn>
      </div>
    </s.EditorContainer>
  );
};
export default Edit;
