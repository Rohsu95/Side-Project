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
`;
const TagSpan = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.fs0};
  padding: 0.25rem;
  border-radius: 8px;
  margin-right: 0.5rem;
  background-color: ${theme.colors.tag};
`;
const Editor = () => {
  const [enter, setEnter] = useState(false);
  const [input, setInput] = useState({
    title: "",
    content: "",
    article: "",
    tags: "",
  });
  const { title, content, article, tags } = input;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  console.log(input);

  const onKeyPress = () => {
    return tags === "" ? "" : setEnter(true);
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
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder="Enter tags"
        />
        <TagDiv>
          {/* 태그에 맵을 쓰 태그 인풋에 이벤트로 트루 폴스 주고 트루 시 맵으로 작성한거 뿌려주기  */}
          {/* {tags.map((el, id) => (
            <>
              <TagSpan>{el.name}</TagSpan>
            </>
          ))} */}
        </TagDiv>
        <EditorBtn>Publish Article</EditorBtn>
      </div>
    </EditorContainer>
  );
};
export default Editor;
