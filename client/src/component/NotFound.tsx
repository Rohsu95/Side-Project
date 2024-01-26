import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 700px;
`;

const NoticeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 290px;
  width: 420px;
  margin: 150px 16px;
  border-radius: 20px;
  background-color: #f2f2f2;
`;

const Notfound = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.fs24};
  font-weight: 500;
  margin: 10px;
`;

const PageBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.main};
  font-size: ${({ theme }) => theme.fontSizes.fs16};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 400;
  border: 0;
  border-radius: 5px;
  margin: 25px 13px 0px 0;
  /* width: 170px; */
  padding: 0 15px;
  height: 40px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.main_hover};
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

const BtnBox = styled.div`
  display: flex;
`;

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <NoticeDiv>
          <Notfound>페이지를 찾을 수 없습니다.</Notfound>

          <BtnBox>
            <PageBtn
              onClick={() => {
                navigate(-1);
              }}
            >
              이전 페이지
            </PageBtn>
            <PageBtn
              onClick={() => {
                navigate("/");
              }}
            >
              홈으로 가기
            </PageBtn>
          </BtnBox>
        </NoticeDiv>
      </Container>
    </>
  );
};

export default NotFound;
