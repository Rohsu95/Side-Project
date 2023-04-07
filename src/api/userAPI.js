import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

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

export const getWrite = async (token, params) => {
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

export const deleteWrite = async (token, id) => {
  try {
    const res = await axios({
      url: `${url}/reals/${id}`,
      method: "delete",
      headers: { Authorization: `Bearer ${token}` },
    });

    // console.log("real정보", res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
