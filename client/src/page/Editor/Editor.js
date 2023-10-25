import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import axios from "axios";
import { getCookie } from "cookies";
import { Cookies } from "react-cookie";

const Editor = ({ userInfo }) => {
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const username = cookie.get("username");
  const image = cookie.get("image");

  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();
  const { title, content } = input;

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
  const onWriting = async () => {
    try {
      let tagsItem = String(tagsList);
      const now = new Date(Date.now());

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/editor`,
        {
          title: title,
          content: content,
          tags: tagsItem,
          createdAt: now,
          creator: userId,
          username: username,
          image: image,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      navigate("/");
      window.location.reload();
    } catch (error) {

      console.log(error);
     

      alert(error?.response?.data?.message);
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
          placeholder="태그 작성 후 엔터를 눌러주세요"
        />
        <s.TagDiv>
          {tagsList.map((el, id) => (
            <s.TagSpan key={id}>
              <s.TagDelete
                aria-label="delete_button"
                onClick={() => onDelete(id)}
              >
                X
              </s.TagDelete>
              {el}
            </s.TagSpan>
          ))}
        </s.TagDiv>
        <s.EditorBtn onClick={onWriting}>Publish Article</s.EditorBtn>
      </div>
    </s.EditorContainer>
  );
};
export default Editor;
