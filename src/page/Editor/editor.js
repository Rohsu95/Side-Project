import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../Cookies";
import * as s from "./style";

const Editor = () => {
  const [tags, setTags] = useState("");
  const [tagsList, setTagsList] = useState([]);
  // const [input, setInput] = useState({
  //   title: "",
  //   content: "",
  //   article: "",
  // });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [article, setArticle] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  // const { title, content, article } = input;
  // const TagsChange = (e) => {
  //   setTags(e.target.value);
  // };

  // const onTitle = (e) => {
  //   const { name, value } = e.target;
  //   setInput({
  //     ...input,
  //     [name]: value,
  //   });
  // setTitle(e.target.value);
  // };
  // const onAreticle = (e) => {
  //   setArticle(e.target.value);
  // };
  // const onContent = (e) => {
  //   setContent(e.target.value);
  // };

  // console.log(input);
  // console.log("복사", tagsList);

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      onItem();
    }
  };
  const onItem = () => {
    let updataed = [...tagsList];
    updataed.push(tags);
    setTagsList(updataed);
    setTags("");
  };
  // 유어 클래스 모달에 태그가 있을것이다 확인해보자 아니면 axios로 삭제 통신 만들기도 있다
  const onDelete = (id) => {
    setTagsList((tagsList) => tagsList.filter((el) => el !== id));
  };
  // 만약 1개만 쓴다면 네임하고 다 들어가있고 그럼 이펙에서만 조절?
  const jwtToken = getCookie("token") || localStorage.getItem("token");

  // const loginCheck = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:1337/api/users/me", {
  //       headers: {
  //         Authorization: `Bearer ${jwtToken}`,
  //       },
  //     });
  //     setIsLoggedIn(true);
  //     console.log("이건 뭐야", isLoggedIn);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const onClick = async () => {
    try {
      let tagsitem = String(tagsList);
      const response = await axios.post(
        "http://localhost:1337/api/reals?populate=*",
        // "http://localhost:1337/api/auth/local/register",
        {
          data: {
            title: title,
            content: content,
            article: article,
            tags: tagsitem,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   loginCheck();
  // }, []);
  // 메인 프젝에 통신 네트워크에서 여기 처럼 배열에 문자열 드가는지 확인 해보고 통신 제발 성공 하자
  return (
    <s.EditorContainer>
      <div>
        <s.TitleInput
          type="text"
          name="title"
          value={title}
          // onChange={onTitle}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article Title"
        />
        <s.ArticleInput
          type="text"
          name="article"
          value={article}
          // onChange={onTitle}
          onChange={(e) => setArticle(e.target.value)}
          placeholder="What's this article about"
        />
        <s.ContentArea
          type="text"
          name="content"
          value={content}
          // onChange={onTitle}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your article (in markdown)"
        />
        <s.TagInput
          type="text"
          name="tags"
          value={tags}
          // onChange={TagsChange}
          onChange={(e) => setTags(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder="Enter tags"
        />
        <s.TagDiv>
          {tagsList.map((el, id) => (
            <s.TagSpan key={id}>
              <s.TagDelete onClick={onDelete}>X</s.TagDelete>
              {el}
            </s.TagSpan>
          ))}
        </s.TagDiv>
        <s.EditorBtn onClick={onClick}>Publish Article</s.EditorBtn>
      </div>
    </s.EditorContainer>
  );
};
export default Editor;
