import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/Theme";

export const Container = styled.div`
  margin-top: 2rem;
`;

export const Sign = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  .login {
    display: inline;

    &:hover {
      color: ${theme.colors.main_hover};
    }
  }
  h1 {
    margin-bottom: 1rem;
  }
`;
export const SignupLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.main};
`;
export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  span {
    font-size: 0.75rem;
    display: block;
    margin-bottom: 1.25rem;
    color: red;
  }

  .Input {
    width: 30rem;
    height: 3.25rem;
    padding: 0 0.75rem;
    font-size: 1.25rem;
    display: block;
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray_03};
    @media ${theme.media.height} {
      width: 20rem;
    }
  }
  button {
    border: 0;
    width: 6rem;
    float: right;
    height: 2.75rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: ${theme.fontSizes.fs1};
    color: ${theme.colors.white};
    background-color: ${theme.colors.main};

    &:hover {
      background-color: ${theme.colors.main_hover};
    }
  }
`;
