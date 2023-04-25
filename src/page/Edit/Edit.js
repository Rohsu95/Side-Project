import { dbService } from "fBase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style";

const Edit = ({ user }) => {
  // 수정 할 정보 불러오기
  const [nweets, setNweets] = useState([]);
  // 태그
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState([]);
  // 인풋 내용
  const [input, setInput] = useState({
    title: "",
    content: "",
    article: "",
  });

  const navigate = useNavigate();
  const { title, content, article } = input;

  const onTotal = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  // 수정 부분
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

  // Enter 누를 시 태그 생성
  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      onItem();
    }
  };
  // 태그
  const onItem = () => {
    let updataed = [...tagsList];
    updataed.push(tags);
    setTagsList(updataed);
    setTags("");
  };
  // 태그 삭제
  const onDelete = (id) => {
    setTagsList((tagsList) => tagsList.filter((_, el) => el !== id));
  };
  const onClick = async (id) => {
    let tagsitem = String(tagsList);

    try {
      const editor = {
        title: title,
        content: content,
        article: article,
        tags: tagsitem,
        displayName: user.displayName,
        uid: user.uid,
      };
      const pageRef = doc(dbService, "editor", `${nweets[0].id}`);
      await updateDoc(pageRef, editor);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <s.EditorContainer>
      <div>
        <s.TitleInput
          type="text"
          name="title"
          value={title}
          onChange={onTotal}
          placeholder="Article Title"
        />
        <s.ArticleInput
          type="text"
          name="article"
          value={article}
          onChange={onTotal}
          placeholder="What's this article about"
        />
        <s.ContentArea
          type="text"
          name="content"
          value={content}
          onChange={onTotal}
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
              <s.TagDelete onClick={() => onDelete(id)}>X</s.TagDelete>
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
