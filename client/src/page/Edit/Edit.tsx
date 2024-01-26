import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchPlaces } from "../../api/placesAPI";
import { RouteParams } from "../../types/params";
import { IEdit } from "../../types/places";

const Edit = () => {
  const queryClient = useQueryClient();
  // 수정 할 정보 불러오기
  const { id } = useParams() as RouteParams;
  // 태그
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState<string[]>([]);

  const navigate = useNavigate();
  // 인풋 내용
  const [input, setInput] = useState({
    title: "",
    content: "",
    tags: "",
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

  // Enter 누를 시 태그 생성
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.length !== 0 && e.key === "Enter") {
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
  const onDelete = (id: number) => {
    setTagsList((tagsList) => tagsList.filter((_, el) => el !== id));
  };

  // 수정 기능
  const { mutate } = useMutation({
    mutationKey: ["PATCH_KEY"],

    mutationFn: (data: IEdit) => patchPlaces(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      if (data !== undefined) {
        navigate("/");
      }
    },
  });

  const onClick = () => {
    let tagsitem = String(tagsList);

    mutate({
      title: title,
      content: content,
      tags: tagsitem,
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
        <s.EditorBtn aria-label="modify_button" onClick={onClick}>
          Article Modify
        </s.EditorBtn>
      </div>
    </s.EditorContainer>
  );
};
export default Edit;
