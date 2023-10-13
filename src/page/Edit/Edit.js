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
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import { Cookies } from "react-cookie";
import axios from "axios";

const Edit = ({ userPlace }) => {
  const cookie = new Cookies();
  const Token = cookie.get("token");

  // 수정 할 정보 불러오기
  const { id } = useParams();
  // 태그
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState([]);
  // 해당 게시글 정보
  // const Modify = userPlace.find((el) => el.id === id);

  const navigate = useNavigate();
  // 인풋 내용
  const [input, setInput] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const { title, content } = input;

  const onTotal = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  // console.log(Modify);

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

  // 수정 버튼
  const onClick = async (id) => {
    let tagsitem = String(tagsList);
    await axios
      .patch(
        `http://localhost:8000/api/places/${id}`,
        {
          title: title,
          content: content,
          tags: tagsitem,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
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
          placeholder="Enter tags"
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
        <s.EditorBtn aria-label="modify_button" onClick={() => onClick(id)}>
          Article Modify
        </s.EditorBtn>
      </div>
    </s.EditorContainer>
  );
};
export default Edit;
