import styled from "styled-components";
import theme from "../../styles/Theme";

export const MainImg = styled.div`
  height: 13rem;
  background-color: ${theme.colors.main};
  text-align: center;
  padding: 1rem;

  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  .EditImg {
    width: 90px;
    height: 90px;
    border-radius: 50px;
  }
  .Containers {
    font-weight: 700;
    font-size: ${theme.fontSizes.fs25};
    margin-top: 1.5rem;
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs2};
      padding: 0.55rem;
    }
  }
  .Spans {
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes.fs15};
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs1};
      padding: 0.55rem;
    }
  }
  .EditDiv {
    display: flex;
    justify-content: right;
    margin-right: 2rem;
  }
  .EditA {
    padding: 0.25rem 0.5rem;
    border-radius: 5px;
    text-decoration: none;
    color: ${theme.colors.white};
    border: 2px solid ${theme.colors.white};
    &:hover {
      color: ${theme.colors.main_hover};
      border: 2px solid ${theme.colors.main_hover};
    }
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs0};
    }
    svg {
      @media ${theme.media.height} {
        font-size: ${theme.fontSizes.fs07};
        margin-right: 0.125rem;
        margin-top: 0.125rem;
      }
    }
  }
`;

export const ImgDiv = styled.div`
  height: 80px;
  .iconUp {
    width: 90px;
    height: 90px;
  }
`;
export const Edit = styled.div`
  display: flex;
  float: right;
  margin-right: 3rem;

  .label-file {
    padding: 5px 10px;
    color: ${theme.colors.white};
    border: 2px solid ${theme.colors.white};
    cursor: pointer;
    border-radius: 5px;
    &:hover {
      color: ${theme.colors.main_hover};
      border: 2px solid ${theme.colors.main_hover};
    }
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs0};
    }
  }
  .submit {
    color: ${theme.colors.white};
    border: 2px solid ${theme.colors.white};
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    background: none;
    margin-left: 0.5rem;
    &:hover {
      color: ${theme.colors.main_hover};
      border: 2px solid ${theme.colors.main_hover};
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
  .likeFocus {
    background-color: white;
  }
`;
export const MainMap = styled.div`
  margin: 2rem 3rem 0 3rem;
`;

export const MainBorder = styled.div`
  border-bottom: 2px solid ${theme.colors.gray_03};
  margin-bottom: 1rem;
`;
export const MapPicture = styled.a`
  display: flex;
  align-items: center;
  .icon {
    width: 36px;
    height: 36px;
    border-radius: 30px;
    border: 1px solid gray;
    margin-right: 0.5rem;
  }
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

  .basic {
    cursor: pointer;
    padding: 0 0.5rem;
    height: 2.8vh;
    border-radius: 5px;
    border: 1px solid ${theme.colors.main};
    background-color: white;

    &:hover {
      background-color: ${theme.colors.main};
      color: white;
    }

    svg {
      margin-right: 0.25rem;

      @media ${theme.media.height} {
        font-size: ${theme.fontSizes.fs07};
      }
    }
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs0};
    }
  }
  .focus {
    background-color: ${theme.colors.main};
    color: white;
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
export const LogOut = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 3rem;
  span {
    display: inline-block;
    margin-left: 2rem;
    font-size: 1.5rem;
    color: ${theme.colors.white};
  }
`;
export const LogOutBtn = styled.button`
  /* width: 3.125rem; */
  padding: 0 0.5rem 0 0.5rem;
  height: 1.75rem;
  color: white;
  border: 1px solid white;
  background-color: ${theme.colors.main};
  border-radius: 4px;

  &:hover {
    border: 1px solid ${theme.colors.main_hover};
    color: ${theme.colors.main_hover};
  }
  @media ${theme.media.height} {
    font-size: ${theme.fontSizes.fs0};
    padding: 0.5em;
  }
`;

export const InfoBtn = styled.button`
  display: flex;
  height: 3vh;
  cursor: pointer;
  align-items: center;
  border-radius: 5px;
  margin-left: 0.125rem;
  margin-right: 0.25rem;
  padding: 0.25rem 0.25rem;
  color: ${(props) => props.color};
  background-color: ${theme.colors.white};
  border: 1.5px solid ${(props) => props.border};
  svg {
    padding: 0.125rem;
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
