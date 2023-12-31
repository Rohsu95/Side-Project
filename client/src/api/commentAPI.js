import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

// 댓글 정보
export const getComment = async (Token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}/api/places/comments`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// 댓글 생성
export const postComment = async (data) => {
  try {
    const res = await axios({
      method: "post",
      data,
      headers: { "Content-Type": "application/json" },
      url: `${url}/api/places/comment`,
    });

    return res.data;
  } catch (e) {
    console.log(e);
    alert(e?.response?.data?.message);
    // return e;
  }
};

// 댓글 삭제
export const deleteComment = async (Token, id) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}/api/places/comment/${id}`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    // console.log(res);
    alert("삭제 하였습니다.");
    window.location.reload();
    return res.data;
  } catch (error) {
    // console.log(error);
  }
};
