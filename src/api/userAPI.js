import axios from "axios";
import { useState } from "react";

const url = `http://localhost:1337/api`;

export const getUser = async (token) => {
  try {
    const res = await axios({
      url: `${url}/users/me`,
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    });

    // console.log("login", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getWrite = async (token) => {
  try {
    const res = await axios({
      url: `${url}/reals`,
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    });

    // console.log("real정보", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
// str api에서 user엔드 포인트 와 real 엔드 포인트가 있다 user에 real을 relation을 했고 real에는 users_permissions_users를 했다 이러면 어떻 변화가 생기는가?
