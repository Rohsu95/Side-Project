import React, { useState } from "react";
import styled from "styled-components";
import imgs from "../../profile.jpg";
import theme from "../../styles/Theme";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 140vh;
`;
const DetailContainer = styled.div`
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  /* height: 15rem; */
  padding: 3rem 0;
  display: flex;
  align-items: center;

  .info {
    margin-left: 3rem;
    margin-right: 3rem;

    @media ${theme.media.phone} {
      font-size: ${theme.fontSizes.fs07};
    }
  }
`;
const DetailInfo = styled.div`
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
const DetailA = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;
const DetailImg = styled.img`
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
const DetailName = styled.button`
  color: ${theme.colors.main};
  background-color: ${theme.colors.black};
  border: none;
  cursor: pointer;
  display: flex;

  @media ${theme.media.mobile} {
    white-space: nowrap;
    justify-content: center;
  }
`;
const DetailDate = styled.span`
  color: ${theme.colors.content};

  @media ${theme.media.mobile} {
    white-space: nowrap;
  }
`;
const InfoBtn = styled.button`
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
const DetailContent = styled.div`
  margin: 3rem 3rem 0 3rem;
  padding-bottom: 3rem;
  border-bottom: 2px solid ${theme.colors.gray_03};
`;
const DetailTag = styled.ul`
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

const CommentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  .textArea {
    padding: 1.25rem 1.25rem;
    width: 40vw;
    height: 8vh;
    display: block;
    border-radius: 5px 5px 0 0;
    border: 2px solid ${theme.colors.gray_01};
  }
`;

const CommentText = styled.div``;
const CommentPost = styled.div`
  display: flex;
  height: 6vh;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.gray_01};
  border: 2px solid ${theme.colors.gray_01};
  /* border-top: 1px solid ${theme.colors.gray_01}; */
  border-radius: 0 0 10px 10px;

  @media ${theme.media.phone} {
    font-size: ${theme.fontSizes.fs0};
    margin-bottom: ${(props) => props.margin};
  }
`;
const CommentBtn = styled.button`
  height: 3vh;
  border-radius: 5px;
  padding: 0.25rem 0.5rem;
  margin-right: 1.25rem;
  color: ${theme.colors.white};
  border: 2px solid ${theme.colors.main};
  background-color: ${theme.colors.main};

  @media ${theme.media.phone} {
    font-size: ${theme.fontSizes.fs0};
  }
`;

const CcommentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
const CcommentTitle = styled.div`
  margin-bottom: 1rem;
`;
const CcommentDiv = styled.div`
  width: 35vw;
  height: 4vh;
  padding: 1.25rem 1.25rem;
  border: 2px solid ${theme.colors.gray_01};
`;
const CcommentDelete = styled.button`
  border: none;
  font-size: ${theme.fontSizes.fs15};
  background-color: ${theme.colors.gray_01};
  margin-right: 1.25rem;
`;
// 현재 상태값을 넣어줬다
// 클릭 시 담아줘야 한다
const Detail = () => {
  const [commentInput, setCommentInput] = useState("");
  const [commentInputCopy, setCommentInputCopy] = useState([]);
  const onCommentChange = (e) => {
    setCommentInput(e.target.value);
  };
  const onClick = () => {
    setCommentInputCopy((el) => [commentInput, ...el]);
    setCommentInput("");
  };
  console.log(commentInput);
  console.log("copy", commentInputCopy);
  return (
    <Container>
      <DetailContainer>
        <div className="info">
          <h1>
            If we quantify the alarm, we can get to the FTP pixel through the
            online SSL interface!
          </h1>
          <DetailInfo>
            <div className="detailLine">
              <DetailA to="/mypage">
                <DetailImg src={imgs} alt="이미지" />
              </DetailA>
              <div className="name">
                <DetailName href="/mypage">shtngur</DetailName>
                <DetailDate>mon 03 2023</DetailDate>
              </div>
              <InfoBtn
                border="#ccc"
                color="#ccc"
                hover="#282A3A"
                hover_color="white"
                margin="0.5rem"
              >
                <CiEdit />
                Edit Article
              </InfoBtn>
              <InfoBtn
                border="#A86464"
                color="#A86464"
                hover="#A84448"
                hover_color="white"
              >
                <RiDeleteBinLine />
                Delete Article
              </InfoBtn>
            </div>
          </DetailInfo>
        </div>
      </DetailContainer>
      <DetailContent>
        <div>
          Quia quo iste et aperiam voluptas consectetur a omnis et.\nDolores et
          earum consequuntur sunt et.\nEa nulla ab voluptatem dicta vel.
          Temporibus aut adipisci magnam aliquam eveniet nihil laudantium
          reprehenderit sit.\nAspernatur cumque labore voluptates mollitia
          deleniti et.
        </div>
        <DetailTag>
          <li>return</li>
          <li>hellossssss</li>
        </DetailTag>
      </DetailContent>
      <CommentContainer>
        <CommentText>
          <textarea
            value={commentInput}
            onChange={onCommentChange}
            className="textArea"
            type="text"
            placeholder="Write a comment..."
          />
          <CommentPost>
            <DetailImg
              src={imgs}
              alt="이미지"
              margin="1.25rem"
              width_hover="28px"
              height_hover="28px"
            />
            <CommentBtn onClick={onClick}>Post Comment</CommentBtn>
          </CommentPost>
        </CommentText>
      </CommentContainer>
      <CcommentContainer>
        <div>
          {commentInputCopy.map((item, key) => (
            <CcommentTitle key={key}>
              <CcommentDiv>
                <p>{item}</p>
              </CcommentDiv>
              <CommentPost>
                <DetailImg
                  src={imgs}
                  alt="이미지"
                  margin="1.25rem"
                  width="24px"
                  height="24px"
                  width_hover="28px"
                  height_hover="28px"
                />
                <CcommentDelete>
                  <RiDeleteBinLine />
                </CcommentDelete>
              </CommentPost>
            </CcommentTitle>
          ))}
        </div>
      </CcommentContainer>
    </Container>
  );
};

// RiDeleteBinLine;

export default Detail;
