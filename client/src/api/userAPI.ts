import axios, { AxiosError } from "axios";
import { ILogin, ISignUp } from "../types/auth";

const url = process.env.REACT_APP_BACKEND_URL;

// 유저 정보
export const getUser = async () => {
  const res = await axios.get(`${url}/api/users`);
  return res.data;
};

// 로그인
export const loginUser = async (data: ILogin) => {
  try {
    const res = await axios.post(`${url}/api/users/login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      alert(e?.response?.data?.message);
    }
  }
};

// 회원 가입
export const SignupUser = async (data: FormData) => {
  try {
    const res = await axios.post(`${url}/api/users/signup`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      alert(e?.response?.data?.message);
    }
  }
};

// 유저 정보 수정
export const patchUser = async (id: string, data: ISignUp) => {
  try {
    const res = await axios.patch(`${url}/api/users/${id}`, data);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      alert(e?.response?.data?.message);
    }
  }
};
