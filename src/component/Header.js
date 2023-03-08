import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    background-color: ${theme.colors.main};
  }
  @media ${theme.media.height} {
    white-space: nowrap;
    font-size: 0.8rem;
  }
`;
const Header = () => {
  const [head, setHead] = useState(0);
  // 초기값은 인덱스로 준다
  // 0이면 홈 1이면 로그인 2이면 회원가입
  // 삼항 연산자로 각각의 버튼에 값을 지정해서 상항 연산자 사용해보자
  const onClick = (index) => {
    setHead(index);
  };

  return (
    <Headers>
      <HeaderConduit href="/">conduit</HeaderConduit>
      <HeaderUl>
        <li>
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
        </li>
      </HeaderUl>
    </Headers>
  );
};

export default Header;
