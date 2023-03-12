import React, { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/Theme";

const EditorContainer = styled.div`
  display: flex;
  justify-content: center;

  input {
    width: 60vw;
    display: block;
    margin-top: 1rem;
    border-radius: 5px;
    padding-left: 1rem;
    border: 1px solid ${theme.colors.gray_01};
  }
`;
const TitleInput = styled.input`
  font-size: 1.25rem;
  height: 4.5vh;
`;
const ContentInput = styled.input`
  height: 3vh;
`;
const ArticleArea = styled.textarea`
  width: 60vw;
  height: 15vh;
  margin-top: 1rem;
  border-radius: 5px;
  padding-left: 1rem;
  padding-top: 0.5rem;
  border: 1px solid ${theme.colors.gray_01};
`;
const TagInput = styled.input`
  height: 3vh;
`;
const EditorBtn = styled.button`
  color: white;
  border: none;
  float: right;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  background-color: ${theme.colors.main};
`;
const TagDiv = styled.div`
  margin-top: 0.5rem;
  width: 60vw;
  padding-left: 1rem;
`;
const TagSpan = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.fs0};
  padding: 0.2rem 0.3rem 0.2rem 0.1rem;
  border-radius: 8px;
  margin-right: 0.5rem;
  background-color: ${theme.colors.tag};
`;
const TagDelete = styled.button`
  border: none;
  color: white;
  background-color: ${theme.colors.tag};
  font-size: 0.1rem;
  cursor: pointer;
`;
const Editor = () => {
  const [enter, setEnter] = useState(false);
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [input, setInput] = useState({
    title: "",
    content: "",
    article: "",
    // tags: "",
  });

  const { title, content, article } = input;
  const TagsChange = (e) => {
    setTags(e.target.value);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  console.log(input);

  console.log("복사", tagsList);

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
    setTagsList((tagsList) => tagsList.filter((el) => el.id !== id));
  };
  return (
    <EditorContainer>
      <div>
        <TitleInput
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Article Title"
        />
        <ContentInput
          type="text"
          name="content"
          value={content}
          onChange={onChange}
          placeholder="What's this article about"
        />
        <ArticleArea
          type="text"
          name="article"
          value={article}
          onChange={onChange}
          placeholder="Write your article (in markdown)"
        />
        <TagInput
          type="text"
          name="tags"
          value={tags}
          onChange={TagsChange}
          onKeyPress={onKeyPress}
          placeholder="Enter tags"
        />
        <TagDiv>
          {tagsList.map((el, id) => (
            <TagSpan key={id}>
              <TagDelete onClick={onDelete}>X</TagDelete>
              {el}
            </TagSpan>
          ))}
        </TagDiv>
        <EditorBtn>Publish Article</EditorBtn>
      </div>
    </EditorContainer>
  );
};
export default Editor;
