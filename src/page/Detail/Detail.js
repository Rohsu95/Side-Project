import React from "react";
import styled from "styled-components";
import imgs from "../../profile.jpg";
import theme from "../../styles/Theme";

const Container = styled.div``;
const DetailContainer = styled.div`
  /* border: 2px solid red; */
  background-color: ${theme.colors.main};
  color: ${theme.colors.white};
  height: 15rem;
`;
const DetailInfo = styled.div`
  border: 2px solid red;
`;
const DetailImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 25px;
`;
const Detail = () => {
  return (
    <Container>
      <DetailContainer>
        <h1>
          If we quantify the alarm, we can get to the FTP pixel through the
          online SSL interface!
        </h1>
        <DetailInfo>
          <a href="/mypage">
            <DetailImg src={imgs} alt="이미지" />
          </a>
          <a href="/mypage">shtngur</a>
          <p></p>
        </DetailInfo>
      </DetailContainer>
      <div>내용</div>
      <div>댓글</div>
    </Container>
  );
};

export default Detail;
