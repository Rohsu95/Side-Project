import { v4 } from "uuid";
import { dbService, storageService } from "fBase";
import { updateCurrentUser } from "firebase/auth";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style";

const Editor = ({ displayName, uid }) => {
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [input, setInput] = useState({
    title: "",
    content: "",
    article: "",
  });
  const [like, setLike] = useState(0);
  const [attachment, setAttachment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { title, content, article } = input;

  const onTotal = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

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
      let attachmentUrl = "";
      if (attachment !== "") {
        const fileRef = ref(storageService, `${uid}/${v4()}`);
        const response = await uploadString(fileRef, attachment, "data_url");
        attachmentUrl = await getDownloadURL(response.ref);
      }

      const editor = {
        title: title,
        content: content,
        article: article,
        tags: tagsitem,
        like: like,
        createdAt: Timestamp.fromDate(now),
        displayName: displayName,
        uid: uid,
        attachmentUrl,
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
