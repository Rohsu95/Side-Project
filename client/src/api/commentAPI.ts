import axios, { AxiosError } from "axios";
import { IComment } from "../types/comment";

const url = process.env.REACT_APP_BACKEND_URL;

// 댓글 정보
export const getComment = async () => {
  const res = await axios.get(`${url}/api/places/comments`);
  return res.data;
};

// 댓글 생성
export const postComment = async (data: IComment) => {
  try {
    const res = await axios.post(`${url}/api/places/comment`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      alert(e?.response?.data?.message);
    }
  }
};

// 댓글 삭제
export const deleteComment = async (Token: string, id: string) => {
  const res = await axios.delete(`${url}/api/places/comment/${id}`, {
    headers: { Authorization: `Bearer ${Token}` },
  });
  alert("삭제 하였습니다.");
  window.location.reload();
  return res.data;
};
