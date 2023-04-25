import { dbService } from "fBase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style";

const Editor = ({ user }) => {
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [input, setInput] = useState({
    title: "",
    content: "",
    article: "",
  });
  const [like, setLike] = useState(0);
  const navigate = useNavigate();
  const { title, content, article } = input;

  const onTotal = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  // 엔터 누를 시 실행
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
  // 삭제
  const onDelete = (id) => {
    setTagsList((tagsList) => tagsList.filter((_, el) => el !== id));
  };
  // 생성
  const onClick = async () => {
    let tagsitem = String(tagsList);
    const now = new Date(Date.now());

    try {
      const editor = {
        title: title,
        content: content,
        article: article,
        tags: tagsitem,
        like: like,
        createdAt: Timestamp.fromDate(now),
        displayName: user.displayName,
        uid: user.uid,
        attachmentUrl: user.photoURL,
      };
      await addDoc(collection(dbService, "editor"), editor);
      console.log(editor);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(tagsList);

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
        <s.EditorBtn onClick={onClick}>Publish Article</s.EditorBtn>
      </div>
    </s.EditorContainer>
  );
};
export default Editor;
