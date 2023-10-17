import dayjs from "dayjs";
import React from "react";

export const Daj = ({ createdAt }) => {
  const getDay = dayjs(createdAt);
  return <div>{getDay.format("YYYY-MM-DD")}</div>;
};

export const DetailDaj = ({ createdAt }) => {
  const getDay = dayjs(createdAt);
  return <div>{getDay.format("YYYY-MM-DD HH:mm")}</div>;
};
