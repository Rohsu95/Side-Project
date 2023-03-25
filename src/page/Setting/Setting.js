import React from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../Cookies";
import * as s from "./style";

const Setting = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const logoutBtn = () => {
    removeCookie("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    // window.location.reload();
    navigate("/login");
  };

  return (
    <s.Container>
      <h1>Your Settings</h1>
      <s.FormContainer>
        <form>
          <s.FirstInput placeholder="이미지" />
          <s.SecondInput placeholder="Username" />
          <s.TextArea placeholder="Short bio about you" />
          <s.SecondInput placeholder="Email" />
          <s.SecondInput placeholder="New Password" />
          <s.SettingBtn>Update Settings</s.SettingBtn>
        </form>
      </s.FormContainer>
      <s.LogOut>
        <s.LogOutBtn onClick={logoutBtn}>Log Out</s.LogOutBtn>
      </s.LogOut>
    </s.Container>
  );
};

export default Setting;
