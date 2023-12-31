import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

export const getUser = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${url}/api/users`,
      headers: { Authorization: `Bearer${token}` },
    });

    return res;
  } catch (err) {
    console.log(err);
    // throw err;
  }
};

// 로그인
export const loginUser = async (data) => {
  try {
    const res = await axios({
      method: "post",
      data,
      headers: { "Content-Type": "application/json" },
      url: `${url}/api/users/login`,
    });

    return res.data;
  } catch (e) {
    console.log(e);
    alert(e?.response?.data?.message);
    // return e;
  }
};

// 회원 가입
export const SignupUser = async (data) => {
  try {
    const res = await axios({
      method: "post",
      data,
      headers: { "Content-Type": "multipart/form-data" },
      url: `${url}/api/users/signup`,
    });

    return res.data;
  } catch (e) {
    console.log(e);
    alert(e?.response?.data?.message);
    // return e;
  }
};
