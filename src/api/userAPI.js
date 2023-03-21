import axios from "axios";

const url = `http://localhost:1337/api`;

export const getWrite = async () => {
  try {
    const res = await axios({
      url: `${url}/reals?populate=*`,
      method: "get",
      // headers: { Authorization: `Bearer ${Token}` },
    });
    // 로그인에 토큰을 받아오면 메인 페이지에 토큰이 있기에 연결 될수도 있다
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
