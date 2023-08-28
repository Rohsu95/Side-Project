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

// 라이트로 서스펜스 적용 얼마나 됬는지 확인 하기
// 좋아요 기능 그냥 수 빼고 색만 변하게 하기 새로 고침 시 원상 복귀 된다
// === 좋아요 기능 일단 보류 조언 듣고 하자. 서스펜스 먼저 확인 후 이력서 작성 ㄱㄱ 그 후 기술 면접
// 시간은 10시 전 까지 마무리 후 10시 부터 기술 면접 도전 해보자
//     -> 기술 면접 한번 읽어보기 전부다 -> 이력서 작성
