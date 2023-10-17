import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/Theme";

export const Container = styled.div`
  height: 140vh;
`;
export const DetailContainer = styled.div`
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};

  padding: 3rem 0;
  display: flex;
  align-items: center;

  @media ${theme.media.phone} {
    display: flex;
    justify-content: center;
  }
  .info {
    margin-left: 3rem;
    margin-right: 3rem;

    @media ${theme.media.phone} {
      font-size: ${theme.fontSizes.fs07};
    }
  }
  h1 {
    @media ${theme.media.phone} {
      display: flex;
      justify-content: center;
    }
  }
`;
export const DetailInfo = styled.div`
  margin-top: 2rem;
  .detailLine {
    display: flex;
    align-items: center;

    @media ${theme.media.phone} {
      flex-direction: column;
    }
  }
  .name {
    display: flex;
    flex-direction: column;
    margin-right: 2rem;

    @media ${theme.media.mobile} {
      white-space: nowrap;
    }
    @media ${theme.media.phone} {
      font-size: ${theme.fontSizes.fs07};
      margin-bottom: 0.5rem;
      margin-left: 1.5rem;
    }
  }
`;
export const DetailA = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;
export const DetailImg = styled.img`
  width: ${(props) => props.width || "36px"};
  height: ${(props) => props.height || "36px"};
  border-radius: 25px;
  margin-right: 0.5rem;
  margin-left: ${(props) => props.margin};

  @media ${theme.media.phone} {
    margin-bottom: 0.5rem;
    width: ${(props) => props.width_hover || "36px"};
    height: ${(props) => props.height_hover || "36px"};
  }
`;
export const DetailName = styled.button`
  color: ${theme.colors.main};
  background-color: ${theme.colors.black};
  border: none;
  cursor: pointer;
  display: flex;

  @media ${theme.media.phone} {
    white-space: nowrap;
    justify-content: center;
  }
`;
export const DetailDate = styled.span`
  color: ${theme.colors.content};

  @media ${theme.media.mobile} {
    white-space: nowrap;
  }
`;
export const InfoBtn = styled.button`
  display: flex;
  height: 3vh;
  align-items: center;
  border-radius: 5px;
  margin-right: 0.25rem;
  padding: 0.25rem 0.25rem;
  color: ${(props) => props.color};
  background-color: ${theme.colors.black};
  border: 2px solid ${(props) => props.border};
  svg {
    margin-right: 2px;
  }
  &:hover {
    background-color: ${(props) => props.hover};
    color: ${(props) => props.hover_color};
  }

  @media ${theme.media.mobile} {
    white-space: nowrap;
  }
  @media ${theme.media.phone} {
    font-size: ${theme.fontSizes.fs07};
    margin-bottom: ${(props) => props.margin};
  }
`;
export const DetailContent = styled.div`
  margin: 3rem 3rem 0 3rem;
  padding-bottom: 3rem;
  border-bottom: 2px solid ${theme.colors.gray_03};
`;
export const DetailTag = styled.ul`
  display: flex;
  list-style: none;
  color: ${theme.colors.content};
  font-size: ${theme.fontSizes.fs0};

  li {
    border: 2px solid ${theme.colors.gray_03};
    padding: 0.125rem 0.25rem;
    border-radius: 20px;
    margin-top: 1rem;
    margin-right: 0.25rem;
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  .textArea {
    padding: 1.25rem 1.5rem;
    width: 40vw;
    height: 8vh;
    display: block;
    border-radius: 5px 5px 0 0;
    border: 2px solid ${theme.colors.gray_01};
  }
  .commentToken {
    padding-bottom: 3rem;

    @media ${theme.media.phone} {
      /* white-space: nowrap; */
      font-size: ${theme.fontSizes.fs07};
    }
  }
`;

export const CommentText = styled.div``;
export const CommentPost = styled.div`
  display: flex;
  height: 6vh;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.gray_01};
  border: 2px solid ${theme.colors.gray_01};
  /* border-top: 1px solid ${theme.colors.gray_01}; */
  border-radius: 0 0 10px 10px;

  .commentName {
    display: flex;
    align-items: center;

    @media ${theme.media.height} {
      white-space: nowrap;
      font-size: ${theme.fontSizes.fs02};
    }
    span {
      margin-bottom: 0.5rem;
    }
  }

  @media ${theme.media.phone} {
    font-size: ${theme.fontSizes.fs0};
    margin-bottom: ${(props) => props.margin};
  }
`;
export const CommentBtn = styled.button`
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  margin-right: 1.25rem;
  color: ${theme.colors.white};
  border: 2px solid ${theme.colors.main};
  background-color: ${theme.colors.main};
  cursor: pointer;
  @media ${theme.media.phone} {
    font-size: 0.125rem;
    margin-left: 0.5rem;
  }
`;

export const CcommentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
export const CcommentTitle = styled.div`
  margin-bottom: 1rem;
`;
export const CcommentDiv = styled.div`
  width: 35vw;
  height: 4vh;
  padding: 1.25rem 1.25rem;
  border: 2px solid ${theme.colors.gray_01};
`;
export const CcommentDelete = styled.button`
  border: none;
  font-size: ${theme.fontSizes.fs15};
  background-color: ${theme.colors.gray_01};
  margin-right: 1.25rem;
  cursor: pointer;
`;
