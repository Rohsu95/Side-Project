import { MapTime } from "page/Main/style";
import React from "react";

// Firebase Timestamp 객체를 JavaScript Date 객체로 변환 createdAt 변환
const FormatDate = ({ date }) => {
  const jsDate = date.toDate();
  const year = jsDate.getFullYear();
  const month = String(jsDate.getMonth() + 1).padStart(2, "0");
  const day = String(jsDate.getDate()).padStart(2, "0");
  const hours = String(jsDate.getHours()).padStart(2, "0");
  const minutes = String(jsDate.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export default FormatDate;
