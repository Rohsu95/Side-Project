import axios from "axios";

import { dbService } from "fBase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../Cookies";
import * as s from "./style";

const Editor = () => {
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [input, setInput] = useState({
    title: "",
    content: "",
    article: "",
  });

  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [article, setArticle] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { title, content, article } = input;
  const TagsChange = (e) => {
    setTags(e.target.value);
  };

  const onTotal = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  // const onAreticle = (e) => {
  //   setArticle(e.target.value);
  // };
  // const onContent = (e) => {
  //   setContent(e.target.value);
  // };

  // console.log(input);
  // console.log("복사", tagsList);

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

  const onClick = async () => {
    let tagsitem = String(tagsList);
    const now = new Date(Date.now());

    try {
      const editor = {
        title: title,
        content: content,
        article: article,
        tags: tagsitem,
        createdAt: Timestamp.fromDate(now),
      };
      await addDoc(collection(dbService, "editor"), editor);
      console.log(editor);
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
        <s.EditorBtn onClick={onClick}>Publish Article</s.EditorBtn>
      </div>
    </s.EditorContainer>
  );
};
export default Editor;
