import React, { useEffect, useState } from "react";
import imgs from "../../profile.jpg";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import * as s from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { deleteWrite, getUser, getWrite } from "../../api/userAPI";
import { Cookies } from "react-cookie";

const Detail = () => {
  const [commentInput, setCommentInput] = useState("");
  const [commentInputCopy, setCommentInputCopy] = useState([]);
  const [your, setYour] = useState([]);
  const navigate = useNavigate();
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const { id } = useParams();
  const onCommentChange = (e) => {
    setCommentInput(e.target.value);
  };
  const onClick = () => {
    setCommentInputCopy((el) => [commentInput, ...el]);
    setCommentInput("");
  };
  console.log(commentInput);
  console.log("copy", commentInputCopy);

  const DeleteClick = async () => {
    if (!window.confirm("정말 삭제 하시겠습니까?")) {
      alert("취소했습니다.");
    } else {
      await deleteWrite(Token, id);
      navigate("/");
    }
  };
  useEffect(() => {
    async function getUserData() {
      try {
        const local = localStorage.getItem("token");
        if (local) {
          const userInfo = await getUser(local);
          const writeInfo = await getWrite(local);

          const userData = {
            userInfo,
            writeInfo,
          };
          setYour([userData]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getUserData();
  }, []);
  console.log(your);
  return (
    <s.Container>
      <s.DetailContainer>
        <div className="info">
          <h1>
            {your[0] &&
              your[0].writeInfo &&
              your[0].writeInfo.data &&
              your[0].writeInfo.data.attributes &&
              your[0].writeInfo.data.attributes.title}
          </h1>
          <s.DetailInfo>
            <div className="detailLine">
              <s.DetailA to="/mypage">
                <s.DetailImg src={imgs} alt="이미지" />
              </s.DetailA>
              <div className="name">
                <s.DetailName href="/mypage">
                  {your[0]?.userInfo?.username}
                </s.DetailName>
                <s.DetailDate>mon 03 2023</s.DetailDate>
              </div>
              <s.InfoBtn
                border="#ccc"
                color="#ccc"
                hover="#282A3A"
                hover_color="white"
                margin="0.5rem"
                onClick={() => navigate("/setting")}
              >
                <CiEdit />
                Edit Article
              </s.InfoBtn>
              <s.InfoBtn
                border="#A86464"
                color="#A86464"
                hover="#A84448"
                hover_color="white"
                onClick={DeleteClick}
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
