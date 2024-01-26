import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/Theme";

export const Container = styled.div`
  margin-top: 2rem;
`;
export const SignupLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.main};
`;
export const Sign = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  .signup {
    display: inline;

    &:hover {
      color: ${theme.colors.main_hover};
    }
  }
  h1 {
    margin-bottom: 1rem;
  }
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
  .SignBtn {
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
  .label-file {
    margin: 5px 0 20px 0;
    font-weight: bold;
    font-size: 13px;
    color: ${theme.colors.main};
    display: inline-block;
    cursor: pointer;

    &:hover {
      color: ${theme.colors.main_hover};
    }
  }
`;
export const ImgDiv = styled.div`
  height: 80px;

  margin-bottom: 2.25rem;
  &.imgLine {
    display: none;
  }
  /* have an account 패딩이 있는거 같다 없애자 */
  .EditImg {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
  .DeleteBtn {
    cursor: pointer;
    color: ${theme.colors.main};
    background-color: ${theme.colors.white};
    border: none;
    font-size: 1rem;

    &:hover {
      color: ${theme.colors.main_hover};
    }
  }
`;
// export const ImgContainer = styled.div`
//   border: 2px solid red;
// `;
