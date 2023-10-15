import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import * as s from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import FormatDate from "component/Date";
import axios from "axios";
import { getCookie } from "cookies";
import { deleteComment, getComment } from "api/writingAPI";

const Detail = ({ userInfo, userPlace }) => {
  // 쿠키
  const cookie = new Cookies();
  // 쿠키에 담긴 토큰, 네임, 아이디값
  const Token = cookie.get("token");
  const username = cookie.get("username");
  const userId = cookie.get("userId");

  // 페이지 정보
  const [commentInput, setCommentInput] = useState("");
  // 댓글
  const [comment, setComment] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const user = userInfo?.find((el) => el.id === userId);

  // 현재 작성한 사람의 이름이 777로 보인데 이유는 내가 쿠키에 저장된 유저 네임을 썻기 때문이다
  // 해결하기 위해서 아마 내가 쿠키에 저장된 유저네임이 아닌 MyPlace의 네임을 써야한다 그럼면 수정하게 되면
  // 못바꾸게 되니 삼항연산자로 게시글의 아이디와 현재 쿠키에 저장된 아이디가 같으면 내가 로그인을 한것이니
  // 그땐 쿠키에 저장된 유저네임을 쓰고 아닐 때엔 그냥 MyPlace.username을 쓰자
  // 그리고 이미지도 이 게시물에 작성된 이미지로 된다 유저의 이미지가 아니고
  // 해결 하기 위해 위에 해결한것과 비슷하게 filter나 find로 로그인 한 유저를 찾고 그 유저의 이미지를 가져오자

  // 게시글의 id와 주소의 id값이 같은 것을 찾는다 그것이 특정 게시물의 정보이다.
  const MyPlace = userPlace.find((user) => user.id === id);

  console.log("MyPlace", MyPlace);
  // read 댓글 정보 보여주기
  useEffect(() => {
    const getPlaceInfo = async () => {
      const res = await getComment();
      setComment(res.data.comment);
    };
    getPlaceInfo();
  }, []);
  console.log("댓글 정보", comment);

  // 생성
  const onComment = async () => {
    try {
      const now = new Date(Date.now());

      const res = await axios.post(
        "http://localhost:8000/api/places/comment",
        {
          comment: commentInput,
          createdAt: now,
          creator: userId,
          username: username,
          image: user.image,
          commentId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      console.log("댓글 생성 성공", res);
      window.location.reload();
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  const onCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  // 댓글 삭제
  const onDeleteComment = async (id) => {
    try {
      if (!window.confirm("삭제 하시겠습니까?")) {
        alert("취소하였습니다.");
      } else {
        await deleteComment(Token, id);
        alert("삭제하였습니다.");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  // 로그인 안했을 때 댓글이 보인다 토큰 없으면 댓글안보이게 하자
  return (
    <s.Container>
      {MyPlace && (
        <div>
          <s.DetailContainer>
            <div className="info">
              <h1>{MyPlace.title}</h1>
              <s.DetailInfo>
                <div className="detailLine">
                  <s.DetailA to="/mypage">
                    <s.DetailImg
                      src={`http://localhost:8000/${MyPlace?.image}`}
                      alt="이미지"
                    />
                  </s.DetailA>
                  <div className="name">
                    <s.DetailName href="/mypage">
                      {MyPlace.creator === userId ? username : MyPlace.username}
                    </s.DetailName>
                    <s.DetailDate>{MyPlace.createdAt}</s.DetailDate>
                  </div>
                  {Token && MyPlace.creator === userId ? (
                    <s.InfoBtn
                      aria-label="edit_button"
                      border="#ccc"
                      color="#ccc"
                      hover="#282A3A"
                      hover_color="white"
                      margin="0.5rem"
                      onClick={() => navigate(`/edit/${MyPlace.id}`)}
                    >
                      <CiEdit />
                      Edit Article
                    </s.InfoBtn>
                  ) : (
                    ""
                  )}
                </div>
              </s.DetailInfo>
            </div>
          </s.DetailContainer>
          <s.DetailContent>
            <div>{MyPlace.content}</div>
            <s.DetailTag>
              <li>{MyPlace.tags}</li>
            </s.DetailTag>
          </s.DetailContent>

          {/* 댓글 작성하는 창 */}
          <s.CommentContainer>
            {Token ? (
              <s.CommentText>
                <textarea
                  value={commentInput}
                  onChange={onCommentChange}
                  className="textArea"
                  type="text"
                  name="commentInput"
                  placeholder="Write a comment..."
                />

                <s.CommentPost>
                  <div className="commentName">
                    <s.DetailImg
                      src={`http://localhost:8000/${user?.image}`}
                      alt="이미지"
                      margin="1.25rem"
                      width_hover="28px"
                      height_hover="28px"
                    />
                    <span>{username}</span>
                  </div>
                  <s.CommentBtn aria-label="comment_button" onClick={onComment}>
                    Comment
                  </s.CommentBtn>
                </s.CommentPost>
              </s.CommentText>
            ) : (
              <div>로그인 하신 후에 댓글을 사용하실 수 있습니다.</div>
            )}
          </s.CommentContainer>

          {/* 댓글 내용 */}
          <s.CcommentContainer>
            <div>
              {comment
                .map((item, key) =>
                  item.commentId === id ? (
                    <s.CcommentTitle key={key}>
                      <s.CcommentDiv>
                        <p>{item.comment}</p>
                      </s.CcommentDiv>
                      <s.CommentPost>
                        <div className="commentName">
                          <s.DetailImg
                            src={`http://localhost:8000/${item?.image}`}
                            alt="이미지"
                            margin="1.25rem"
                            width="24px"
                            height="24px"
                            width_hover="28px"
                            height_hover="28px"
                          />
                          <span>{item.username}</span>
                        </div>
                        {item.creator === userId ? (
                          <s.CcommentDelete
                            aria-label="delete_button"
                            onClick={() => onDeleteComment(item.id)}
                          >
                            <RiDeleteBinLine />
                          </s.CcommentDelete>
                        ) : (
                          ""
                        )}
                      </s.CommentPost>
                    </s.CcommentTitle>
                  ) : (
                    ""
                  )
                )
                .reverse()}
            </div>
          </s.CcommentContainer>
        </div>
      )}
    </s.Container>
  );
};

export default Detail;
