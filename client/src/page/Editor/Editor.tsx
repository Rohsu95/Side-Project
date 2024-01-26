import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import { Cookies } from "react-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPlaces } from "../../api/placesAPI";

const Editor = () => {
  const cookie = new Cookies();
  const userId = cookie.get("userId");
  const username = cookie.get("username");
  const image = cookie.get("image");

  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState<string[]>([]);
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["PLACES_KEY"],
    mutationFn: postPlaces,
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data !== undefined) {
        navigate("/");
      }
    },
  });

  const { title, content } = input;

  const onTotal = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  // 태그
  const onItem = () => {
    let updataed = [...tagsList];
    updataed.push(tags);
    setTagsList(updataed);
    setTags("");
  };

  // 엔터 누를 시 실행
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // const target = e.target as HTMLInputElement;
    // if (target.value.length !== 0 && e.key === "Enter") {
    if (e.currentTarget.value.length !== 0 && e.key === "Enter") {
      onItem();
    }
  };

  // 삭제
  const onDelete = (id: number) => {
    setTagsList((tagsList) => tagsList.filter((_, el) => el !== id));
  };

  // 생성
  const onWriting = () => {
    let tagsItem = String(tagsList);
    const now = new Date(Date.now());

    mutate({
      title: title,
      content: content,
      tags: tagsItem,
      createdAt: now.toISOString(),
      creator: userId,
      username: username,
      image: image,
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
