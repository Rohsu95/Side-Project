import styled from "styled-components";
import theme from "../../styles/Theme";

export const Container = styled.div`
  margin-top: 1rem;

  h1 {
    text-align: center;
    font-weight: 400;
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs15};
    }
  }
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  /* width: 100px; */
  input {
    width: 45vw;
    outline: none;
    display: block;
    border-radius: 3px;
    border: 1px solid ${theme.colors.gray_03};
  }
  form {
    padding-bottom: 2rem;
  }
  span {
    font-size: ${theme.fontSizes.fs07};
    color: red;
    display: block;
    margin-bottom: 1rem;
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs02};
    }
  }
`;
export const FirstInput = styled.input`
  /* width: 50vw; */
  padding: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
export const SecondInput = styled.input`
  /* width: 50vw; */
  margin-bottom: 0.25rem;
  padding: 0.9rem 0.5rem;
`;
export const TextArea = styled.textarea`
  width: 45vw;
  height: 15vh;
  outline: none;
  padding: 0.5rem;
  display: block;
  margin-bottom: 1rem;
  border-radius: 3px;
  border: 1px solid ${theme.colors.gray_03};
`;
export const SettingBtn = styled.button`
  float: right;
  cursor: pointer;
  /* margin-top: 1rem; */
  /* display: block; */
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  color: ${theme.colors.white};
  background-color: ${theme.colors.main};
  border: 1px solid ${theme.colors.main};

  &:hover {
    background-color: ${theme.colors.main_hover};
  }
  @media ${theme.media.height} {
    font-size: ${theme.fontSizes.fs0};
  }
`;
