import axios from "axios";

const url = "http://localhost:8000/";

export const getPlaces = async (Token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}api/places`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deletePlaces = async (Token, id) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}api/places/${id}`,
      id,
      headers: { Authorization: `Bearer ${Token}` },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getComment = async (Token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}api/places/comments`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (Token, id) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${url}api/places/comment/${id}`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// export const editWriting = async (data, Token, id) => {
//   // const formData = {
//   //   content: data.content,
//   //   title: data.title,
//   //   tags: data.tags,
//   // };
//   try {
//     const response = await axios({
//       method: "patch",
//       url: `${url}api/places/${id}`,
//       data,
//       headers: { Authorization: `Bearer ${Token}` },
//     });
//     console.log(response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
