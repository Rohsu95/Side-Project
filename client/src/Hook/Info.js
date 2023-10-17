import { getUser } from "api/userAPI";
import React, { useEffect, useState } from "react";

const Info = () => {
  // // user 정보
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUser();
      setUserInfo(res);
    };
    getUserInfo();
  }, []);
  console.log(userInfo);
};

export default Info;

// 이 함수 안씀.
