import React from "react";
import styled from "styled-components";

const Background = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loading = () => {
  return (
    <Background>
      <h3>데이터를 불러오고 있는 중입니다...</h3>
    </Background>
  );
};

export default Loading;
