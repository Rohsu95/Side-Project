import React from "react";
import styled from "styled-components";
import theme from "../styles/Theme";

const MainContainer = styled.div``;
const MainImg = styled.div`
  height: 100px;
  background-color: ${theme.colors.main};
  text-align: center;
  .Container {
  }
  .Span {
  }
`;
const Main = () => {
  return (
    <MainContainer>
      <MainImg>
        <h1 className="Container">conduit</h1>
        <p className="Span">A place to share your knowledge.</p>
      </MainImg>
      <div>메인</div>
      <div>메인</div>
    </MainContainer>
  );
};

export default Main;
