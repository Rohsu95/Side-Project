import axios from "axios";

const url = "http://localhost:8000/";

export const getUser = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}api/users`,
      headers: { Authorization: `Bearer${token}` },
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (data) => {
  try {
    const res = await axios({
      method: "post",
      data,
      //   headers: { Authorization: null },
      headers: { "Content-Type": "application/json" },
      url: `${url}api/users/login`,
    });
    // console.log("로그인 성공", res);
    return res;
  } catch (e) {
    console.log("e", e);
    return e;
  }
};
