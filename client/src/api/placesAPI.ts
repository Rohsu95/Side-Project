import axios, { AxiosError } from "axios";
import { IEdit, IEditor } from "../types/places";

const url = process.env.REACT_APP_BACKEND_URL;

// 게시글 정보
export const getPlaces = async () => {
  const res = await axios.get(`${url}/api/places`);
  return res.data;
};

// 게시글 삭제
export const deletePlaces = async (Token: string, id: string) => {
  const res = await axios.delete(`${url}/api/places/${id}`, {
    headers: { Authorization: `Bearer ${Token}` },
  });

  return res.data;
};

// 게시글 생성
export const postPlaces = async (data: IEditor) => {
  try {
    const res = await axios.post(`${url}/api/places/editor`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      alert(e?.response?.data?.message);
    }
  }
};

// 게시글 수정
export const patchPlaces = async (id: string, data: IEdit) => {
  try {
    const res = await axios.patch(`${url}/api/places/${id}`, data);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      alert(e?.response?.data?.message);
    }
  }
};
