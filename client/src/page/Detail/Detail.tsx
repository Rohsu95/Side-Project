import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import * as s from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteComment, getComment, postComment } from "../../api/commentAPI";
import { propsType } from "../../types/app";
import { DetailDaj } from "../../component/Date";
import { RouteParams } from "../../types/params";
import { IComment } from "../../types/comment";

const Detail = ({ userInfo, userPlace }: propsType) => {
  // 쿠키
  const cookie = new Cookies();
  // 쿠키에 담긴 토큰, 네임, 아이디값
  const Token = cookie.get("token");
  const username = cookie.get("username");
  const userId = cookie.get("userId");

  const queryClient = useQueryClient();

  // 페이지 정보
  const [commentInput, setCommentInput] = useState("");

  const navigate = useNavigate();
  const { id } = useParams() as RouteParams;

  // read 댓글 정보 보여주기
  const { data: CommentData } = useQuery({
    queryKey: ["CommentInfo"],
    queryFn: getComment,
  });

  // 댓글 정보
  const comment = CommentData?.comment as IComment[];

  // 유저 정보들 중 현재 로그인 한 나의 정보
  const user = userInfo?.find((el) => el.id === userId);

  // 특정 게시물의 정보. 게시글의 id와 주소의 id값이 같은 것을 찾는다
  const MyPlace = userPlace?.find((user) => user.id === id);

  // 생성
  const { mutate: CommentMutation } = useMutation({
    mutationKey: ["COMMENT_KEY"],
    mutationFn: postComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries();

      setCommentInput("");
    },
  });

  // 댓글 생성
  const onComment = () => {
    const now = new Date(Date.now());

    CommentMutation({
      comment: commentInput,
      commentId: id,
      createdAt: now,
      creator: userId,
      username: username,
      image: user?.image,
      id,
    });
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  return (
    <s.Container>
      {MyPlace && (
        <div>
          <s.DetailContainer>
            <div className="info">
              <h1>{MyPlace.title}</h1>
              <s.DetailInfo>
                <div className="detailLine">
                  <s.DetailA to={Token ? "/mypage" : ""}>
                    <s.DetailImg
                      src={`${process.env.REACT_APP_BACKEND_URL}/${MyPlace?.image}`}
                      alt="이미지"
                    />
                  </s.DetailA>
                  <div className="name">
                    <s.DetailName onClick={() => navigate("/mypage")}>
                      {MyPlace?.creator === userId
                        ? user?.username
                        : MyPlace?.username}
                    </s.DetailName>
                    <s.DetailDate>
                      <DetailDaj createdAt={MyPlace.createdAt} />
                    </s.DetailDate>
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
              {MyPlace.tags.split(",").map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
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
                  name="commentInput"
                  placeholder="Write a comment..."
                />

                <s.CommentPost>
                  <div className="commentName">
                    <s.DetailImg
                      src={`${process.env.REACT_APP_BACKEND_URL}/${user?.image}`}
                      alt="이미지"
                      margin="1.25rem"
                      width_hover="20px"
                      height_hover="20px"
                    />
                    <span className="commentUser">{user?.username}</span>
                  </div>
                  <s.CommentBtn aria-label="comment_button" onClick={onComment}>
                    Comment
                  </s.CommentBtn>
                </s.CommentPost>
              </s.CommentText>
            ) : (
              <div className="commentToken">
                로그인 하신 후에 댓글을 작성 사용하실 수 있습니다.
              </div>
            )}
          </s.CommentContainer>

          {/* 댓글 내용 */}
          <s.CcommentContainer>
            <div>
              {comment
                ?.map((item, key) =>
                  item.commentId === id ? (
                    <s.CcommentTitle key={key}>
                      <s.CcommentDiv>
                        <p>{item.comment}</p>
                      </s.CcommentDiv>
                      <s.CommentPost>
                        <div className="commentName">
                          <s.DetailImg
                            src={`${process.env.REACT_APP_BACKEND_URL}/${item?.image}`}
                            alt="이미지"
                            margin="1.25rem"
                            width="24px"
                            height="24px"
                            width_hover="20px"
                            height_hover="20px"
                          />
                          <span className="commentUser">
                            {item.creator === userId
                              ? user?.username
                              : item.username}
                          </span>
                        </div>
                        {/* 삭제 */}
                        {item.creator === userId ? (
                          <s.CcommentDelete
                            aria-label="delete_button"
                            onClick={() => deleteComment(Token, item?.id)}
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
