import axios from "axios";

// const url = process.env.REACT_APP_BACKEND_URL;
const url = "https://side-402809.du.r.appspot.com";

export const getPlaces = async (Token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}/api/places`,
      headers: { Authorization: `Bearer ${Token}` },
    });
    return res;
  } catch (error) {}
};

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
    console.log(error);
  }
};

export const getComment = async (Token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}/api/places/comments`,
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
      url: `${url}/api/places/comment/${id}`,
      headers: { Authorization: `Bearer ${Token}` },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};
