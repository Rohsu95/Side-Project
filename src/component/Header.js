import React from "react";
import styled from "styled-components";
import theme from "../styles/Theme";

const Headers = styled.header`
  border: 2px solid red;
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
  a {
    color: ${theme.colors.content};
    text-decoration: none;
    &:hover {
      color: ${theme.colors.title};
    }
  }
  @media ${theme.media.height} {
    white-space: nowrap;
    font-size: 0.8rem;
  }
`;
const Header = () => {
  return (
    <Headers>
      <HeaderConduit href="/">conduit</HeaderConduit>
      <HeaderUl>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/login">Sign in</a>
        </li>
        <li>
          <a href="/signup">Sign up</a>
        </li>
      </HeaderUl>
    </Headers>
  );
};

export default Header;
