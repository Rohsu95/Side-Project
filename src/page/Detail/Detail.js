import React, { useState } from "react";
import imgs from "../../profile.jpg";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import * as s from "./style";
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
    <s.Container>
      <s.DetailContainer>
        <div className="info">
          <h1>
            If we quantify the alarm, we can get to the FTP pixel through the
            online SSL interface!
          </h1>
          <s.DetailInfo>
            <div className="detailLine">
              <s.DetailA to="/mypage">
                <s.DetailImg src={imgs} alt="이미지" />
              </s.DetailA>
              <div className="name">
                <s.DetailName href="/mypage">shtngur</s.DetailName>
                <s.DetailDate>mon 03 2023</s.DetailDate>
              </div>
              <s.InfoBtn
                border="#ccc"
                color="#ccc"
                hover="#282A3A"
                hover_color="white"
                margin="0.5rem"
              >
                <CiEdit />
                Edit Article
              </s.InfoBtn>
              <s.InfoBtn
                border="#A86464"
                color="#A86464"
                hover="#A84448"
                hover_color="white"
              >
                <RiDeleteBinLine />
                Delete Article
              </s.InfoBtn>
            </div>
          </s.DetailInfo>
        </div>
      </s.DetailContainer>
      <s.DetailContent>
        <div>
          Quia quo iste et aperiam voluptas consectetur a omnis et.\nDolores et
          earum consequuntur sunt et.\nEa nulla ab voluptatem dicta vel.
          Temporibus aut adipisci magnam aliquam eveniet nihil laudantium
          reprehenderit sit.\nAspernatur cumque labore voluptates mollitia
          deleniti et.
        </div>
        <s.DetailTag>
          <li>return</li>
          <li>hellossssss</li>
        </s.DetailTag>
      </s.DetailContent>
      <s.CommentContainer>
        <s.CommentText>
          <textarea
            value={commentInput}
            onChange={onCommentChange}
            className="textArea"
            type="text"
            placeholder="Write a comment..."
          />
          <s.CommentPost>
            <s.DetailImg
              src={imgs}
              alt="이미지"
              margin="1.25rem"
              width_hover="28px"
              height_hover="28px"
            />
            <s.CommentBtn onClick={onClick}>Post Comment</s.CommentBtn>
          </s.CommentPost>
        </s.CommentText>
      </s.CommentContainer>
      <s.CcommentContainer>
        <div>
          {commentInputCopy.map((item, key) => (
            <s.CcommentTitle key={key}>
              <s.CcommentDiv>
                <p>{item}</p>
              </s.CcommentDiv>
              <s.CommentPost>
                <s.DetailImg
                  src={imgs}
                  alt="이미지"
                  margin="1.25rem"
                  width="24px"
                  height="24px"
                  width_hover="28px"
                  height_hover="28px"
                />
                <s.CcommentDelete>
                  <RiDeleteBinLine />
                </s.CcommentDelete>
              </s.CommentPost>
            </s.CcommentTitle>
          ))}
        </div>
      </s.CcommentContainer>
    </s.Container>
  );
};

// RiDeleteBinLine;

export default Detail;
