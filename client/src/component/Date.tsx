import dayjs from "dayjs";
import { Props } from "../types/date";

export const Daj = ({ createdAt }: Props) => {
  const getDay = dayjs(createdAt);
  return <div>{getDay.format("YYYY-MM-DD")}</div>;
};

export const DetailDaj = ({ createdAt }: Props) => {
  const getDay = dayjs(createdAt);
  return <div>{getDay.format("YYYY-MM-DD HH:mm")}</div>;
};
