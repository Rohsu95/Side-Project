import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
    font-size: 1rem;
  }
`;
const HeaderUl = styled.ul`
  display: flex;
  margin-right: 3rem;
  li {
    list-style: none;
    padding: 0.5em;
  }
  .Head-item {
    color: ${theme.colors.content};
    border: none;
    background-color: white;
    cursor: pointer;
    &:hover {
      color: ${theme.colors.title};
    }
  }
  .focused {
    color: ${theme.colors.main};
  }
  @media ${theme.media.height} {
    white-space: nowrap;
    font-size: 0.8rem;
  }
`;
const Header = () => {
  const [head, setHead] = useState(0);
  const navigate = useNavigate();
  const [headTest, setHeadTest] = useState(true);
  const headerMenu = [
    { name: "Home" },
    { name: "Sign in" },
    { name: "Sign up" },
    // slice로 나누는거 찾아보고 안되면 그냥 변수 2개로 두고 맵 2개 쓰기
    // { name: "Post" },
    // { name: "setting" },
    // { name: "shtngur?" },
  ];
  const headCurrent = (index) => {
    setHead(index);
    if (index === 0) {
      navigate("/");
    } else if (index === 1) {
      navigate("/login");
    } else if (index === 2) {
      navigate("/signup");
    }
  };

  return (
    <Headers>
      <HeaderConduit href="/">conduit</HeaderConduit>
      <HeaderUl>
        {headerMenu.map((el, index) => {
          return (
            <button
              key={index}
              className={head === index ? "Head-item focused" : "Head-item"}
              onClick={() => headCurrent(index)}
            >
              {el.name}

              {/* {headTest ? el.name.slice(0, 3) : el.name.slice(3)} */}
              {/* 이렇게 하니 이름에 슬라이스가 걸린다  */}
            </button>
          );
        })}
        {/* <li>
          <Link to="/">
            <button
              onClick={onClick}
              className="Head-item"
              // className={head === 1 ? "Head-item focused" : "Head-item"}
            >
              Home
            </button>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button
              value={1}
              onClick={onClick}
              className="Head-item"
              // className={head === 1 ? "Head-item focused" : "Head-item"}
            >
              Sign in
            </button>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <button className="Head-item">Sign up</button>
          </Link>
        </li> */}
      </HeaderUl>
    </Headers>
  );
};

export default Header;
