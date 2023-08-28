import styled from "styled-components";
import theme from "../../styles/Theme";

export const EditorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  input {
    width: 60vw;
    display: block;
    margin-top: 1rem;
    border-radius: 5px;
    padding-left: 1rem;
    border: 1px solid ${theme.colors.gray_01};
    outline: none;
  }
`;
export const TitleInput = styled.input`
  font-size: 1.25rem;
  height: 4.5vh;
`;
export const ArticleInput = styled.input`
  height: 3vh;
`;
export const ContentArea = styled.textarea`
  width: 60vw;
  height: 15vh;
  margin-top: 1rem;
  border-radius: 5px;
  padding-left: 1rem;
  padding-top: 0.5rem;
  border: 1px solid ${theme.colors.gray_01};
`;
export const TagInput = styled.input`
  height: 3vh;
`;
export const EditorBtn = styled.button`
  color: white;
  border: none;
  float: right;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  background-color: ${theme.colors.main};
  cursor: pointer;
`;
export const TagDiv = styled.div`
  margin-top: 0.5rem;
  width: 60vw;
  padding-left: 1rem;
`;
export const TagSpan = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.fs0};
  padding: 0.375rem 0.6rem 0.375rem 0.375rem;
  border-radius: 15px;
  margin-right: 0.5rem;
  background-color: ${theme.colors.tag};
`;
export const TagDelete = styled.button`
  border: none;
  color: white;
  background-color: ${theme.colors.tag};
  margin-right: 0.25rem;
  font-size: 0.1rem;
  cursor: pointer;
  margin: 0 0.25rem;
`;
