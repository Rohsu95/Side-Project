import styled from "styled-components";
import theme from "../../styles/Theme";

export const MainImg = styled.div`
  height: 11rem;
  background-color: ${theme.colors.content};
  text-align: center;
  padding: 1rem;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  .Containers {
    /* color: ${theme.colors.white}; */
    font-weight: 700;
    font-size: ${theme.fontSizes.fs25};
    margin-top: 1.5rem;
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs2};
      padding: 0.55rem;
    }
  }
  .Spans {
    /* color: ${theme.colors.black}; */
    font-size: ${theme.fontSizes.fs15};
    margin-top: 1rem;
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs1};
      padding: 0.55rem;
    }
  }
`;
export const Edit = styled.div`
  float: right;
  margin-right: 3rem;
  .EditA {
    display: flex;
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    align-items: center;
    text-decoration: none;
    color: ${theme.colors.gray_02};
    border: 2px solid ${theme.colors.gray_03};
    &:hover {
      color: ${theme.colors.gray_04};
      border: 2px solid ${theme.colors.gray_04};
    }
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs0};
    }
  }
`;
export const MainUl = styled.ul`
  list-style: none;
  border-bottom: 2px solid ${theme.colors.gray_02};
  display: flex;
  margin-left: 3rem;
  margin-right: 3rem;

  li {
    margin-top: 1rem;
  }
  .Main-item {
    border: none;
    cursor: pointer;
    padding: 0.75rem;
    color: ${theme.colors.content};
    font-size: ${theme.fontSizes.fs1};
    background-color: ${theme.colors.white};

    &:hover {
      color: ${theme.colors.title};
    }
    @media ${theme.media.height} {
      white-space: nowrap;
      font-size: ${theme.fontSizes.fs07};
    }
  }
  .focused {
    color: ${theme.colors.main};
    border-bottom: 2px solid ${theme.colors.main};

    &:hover {
      color: ${theme.colors.main_hover};
    }
  }
`;
export const MainMap = styled.div`
  margin: 2rem 3rem 0 3rem;
  /* border-bottom: 2px solid ${theme.colors.gray_03}; */
`;

export const MainBorder = styled.div`
  border-bottom: 2px solid ${theme.colors.gray_03};
  margin-bottom: 1rem;
`;
export const MapPicture = styled.a`
  display: flex;
  align-items: center;
`;
export const Img = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 30px;
  border: 1px solid gray;
  margin-right: 0.5rem;
`;
export const MapInfo = styled.div`
  display: flex;
`;
export const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .info {
    display: flex;
    flex-direction: column;
  }
  .Like {
    display: flex;
    align-items: center;

    @media ${theme.media.height} {
      white-space: nowrap;
    }
  }
`;
export const MapName = styled.a`
  color: ${theme.colors.main};
  text-decoration: none;
  font-size: ${theme.fontSizes.fs1};
  &:hover {
    color: ${theme.colors.main_hover};
  }
`;
export const MapTime = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.content};
`;
export const MapLike = styled.button`
  cursor: pointer;
  padding: 0 0.5rem;
  height: 2.5vh;
  border-radius: 5px;
  border: 1px solid ${theme.colors.main};
  background-color: white;

  svg {
    margin-right: 0.25rem;

    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs07};
    }
  }
  &:hover {
    background-color: ${theme.colors.main};
  }
  @media ${theme.media.height} {
    font-size: ${theme.fontSizes.fs0};
  }
`;
export const MapContent = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 2rem;
`;
export const MapTitle = styled.a`
  text-decoration: none;
  .title {
    font-size: ${theme.fontSizes.fs15};
    color: ${theme.colors.title};
    margin-bottom: 3px;
  }
  .content {
    font-size: ${theme.fontSizes.fs1};
    color: ${theme.colors.content};
    margin-bottom: 1rem;
  }
  .span {
    color: ${theme.colors.content};
  }
`;
export const MapUl = styled.ul`
  float: right;
  display: flex;
  list-style: none;
  color: ${theme.colors.content};
  font-size: ${theme.fontSizes.fs0};

  li {
    border: 2px solid ${theme.colors.gray_03};
    padding: 0.125rem 0.25rem;
    border-radius: 20px;
    margin-left: 0.5rem;
  }
`;
