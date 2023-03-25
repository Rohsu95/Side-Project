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
  input {
    outline: none;
    display: block;
    border-radius: 3px;
    border: 1px solid ${theme.colors.gray_03};
  }
  form {
    padding-bottom: 2rem;
    border-bottom: 1px solid ${theme.colors.gray_03};
  }
`;
export const FirstInput = styled.input`
  width: 50vw;
  padding: 0.25rem;
  margin-top: 1rem;
`;
export const SecondInput = styled.input`
  width: 50vw;
  margin-top: 1rem;
  padding: 0.625rem 0.25rem;
`;
export const TextArea = styled.textarea`
  width: 50vw;
  height: 15vh;
  outline: none;
  padding: 0.25rem;
  margin-top: 1rem;
  border-radius: 3px;
  border: 1px solid ${theme.colors.gray_03};
`;
export const SettingBtn = styled.button`
  float: right;
  cursor: pointer;
  margin-top: 1rem;
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
export const LogOut = styled.div`
  width: 50vw;
  display: flex;
  justify-content: center;
  margin-left: 1.5rem;
  margin-top: 2rem;
`;
export const LogOutBtn = styled.button`
  cursor: pointer;
  padding: 0.5em;
  color: #a77979;
  border: 1px solid #a77979;
  background-color: white;
  border-radius: 4px;

  &:hover {
    background-color: #a77979;
    color: white;
  }
  @media ${theme.media.height} {
    font-size: ${theme.fontSizes.fs0};
  }
`;
