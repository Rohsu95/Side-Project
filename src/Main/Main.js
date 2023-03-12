import React from "react";
import styled from "styled-components";
import theme from "../styles/Theme";

const MainContainer = styled.div`
  /* height: 9.5rem; */
`;
const MainImg = styled.div`
  height: 11rem;
  background-color: ${theme.colors.main};
  text-align: center;
  padding: 1rem;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  .Container {
    color: ${theme.colors.white};
    font-weight: 700;
    font-size: ${theme.fontSizes.fs25};
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs2};
      padding: 0.55rem;
    }
  }
  .Span {
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes.fs15};
    @media ${theme.media.height} {
      font-size: ${theme.fontSizes.fs1};
      padding: 0.55rem;
    }
  }
`;
const Main = () => {
  return (
    <MainContainer>
      <MainImg>
        <h1 className="Container">conduit</h1>
        <p className="Span">A place to share your knowledge.</p>
      </MainImg>
      <div>
        <ul>
          <li>
            <button>Your Feed</button>
          </li>
          <li>
            <button>Global Feed</button>
          </li>
        </ul>
      </div>
      <div>메인</div>
    </MainContainer>
  );
};

export default Main;
