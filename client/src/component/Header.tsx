import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { BiEdit } from "react-icons/bi";
import { AiOutlineSetting } from "react-icons/ai";
import { Cookies } from "react-cookie";
import { propsType } from "../types/app";
import theme from "../styles/Theme";

const Headers = styled.header`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderConduit = styled.a`
  text-decoration: none;
  margin-left: 3rem;
  color: ${theme.colors.main};
  font-size: 1.5rem;
  font-weight: 900;
  &:hover {
    color: ${theme.colors.main_hover};
  }
  @media ${theme.media.height} {
    font-size: 0.9rem;
  }
`;
const HeaderUl = styled.ul`
  display: flex;
  margin-right: 3rem;
  align-items: center;
  li {
    list-style: none;
  }
  .Head-item {
    color: ${theme.colors.content};
    border: none;
    background-color: white;
    cursor: pointer;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    &:hover {
      color: ${theme.colors.title};
    }
    @media ${theme.media.height} {
      white-space: nowrap;
      margin-right: 0.7rem;
      font-size: 0.7rem;

      svg {
        font-size: 0.7rem;
      }
    }
  }
  .focused {
    color: ${theme.colors.main};
  }
  svg {
    font-size: ${theme.fontSizes.fs15};
  }
  @media ${theme.media.height} {
    white-space: nowrap;
    font-size: 0.8rem;
  }
`;
const Header = ({ userInfo }: propsType) => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const userId = cookies.get("userId");

  const [head, setHead] = useState(0);
  const navigate = useNavigate();
  const [headTest, setHeadTest] = useState(false);

  const user = userInfo?.find((el) => el.id === userId);

  const headerMenu = [
    { name: "Home" },
    { name: "Sign in" },
    { name: "Sign up" },
  ];
  const headersMenu = [
    { name: "Home" },
    { name: "New Post" },
    { name: "setting" },
    { name: user?.username },
  ];

  const headCurrent = (index: number) => {
    setHead(index);
    if (index === 0) {
      navigate("/");
    } else if (index === 1) {
      navigate("/login");
    } else if (index === 2) {
      navigate("/signup");
    }
  };

  const headsCurrent = (index: number) => {
    setHead(index);
    if (index === 0) {
      navigate("/");
    } else if (index === 1) {
      navigate("/editor");
    } else if (index === 2) {
      navigate(`/setting/${user?.id}`);
    } else if (index === 3) {
      navigate("/mypage");
    }
  };
  useEffect(() => {
    token ? setHeadTest(true) : setHeadTest(false);
  }, [token]);

  return (
    <Headers>
      <HeaderConduit href="/">conduit</HeaderConduit>
      <HeaderUl>
        {headTest
          ? headersMenu.map((el, index) => {
              return (
                <li key={index}>
                  <button
                    className={
                      head === index ? "Head-item focused" : "Head-item"
                    }
                    onClick={() => headsCurrent(index)}
                  >
                    {index === 0 ? el.name : ""}
                    {index === 1 ? (
                      <>
                        <BiEdit />
                        {el.name}
                      </>
                    ) : (
                      ""
                    )}
                    {index === 2 ? (
                      <>
                        <AiOutlineSetting />
                        {el.name}
                      </>
                    ) : (
                      ""
                    )}
                    {index === 3 ? el.name : ""}
                  </button>
                </li>
              );
            })
          : headerMenu.map((el, index) => {
              return (
                <li key={index}>
                  <button
                    className={
                      head === index ? "Head-item focused" : "Head-item"
                    }
                    onClick={() => headCurrent(index)}
                  >
                    {el.name}
                  </button>
                </li>
              );
            })}
      </HeaderUl>
    </Headers>
  );
};

export default Header;
