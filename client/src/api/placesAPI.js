import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

// 게시글 정보 토큰 없어도 될거 같긴 하다 나중에 확인 하기
export const getPlaces = async (Token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}/api/places`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    return res;
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

// 게시글 생성
export const postPlaces = async (data) => {
  try {
    const res = await axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: `${url}/api/places/editor`,
      data,
    });

    return res.data;
  } catch (e) {
    console.log(e);
    alert(e?.response?.data?.message);
    // return e;
  }
};

// 게시글 삭제
export const deletePlaces = async (Token, id) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}/api/places/${id}`,
      id,
      headers: { Authorization: `Bearer ${Token}` },
    });

    return res;
  } catch (error) {
    // console.log(error);
  }
};

// 게시글 수정
// export const patchPlaces = async (id, data) => {
//   try {
//     const res = await axios({
//       method: "patch",
//       url: `${url}/api/users/places/${id}`,
//       // headers: { Authorization: `Bearer ${Token}` },
//       data,
//     });
//     console.log(res);
//     return res.data;
//   } catch (e) {
//     console.log(e);
//     alert(e?.response?.data?.message);
//     // return e;
//   }
// };
