import React from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../Cookies";
import * as s from "./style";

const Setting = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const logoutBtn = () => {
    removeCookie("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    // window.location.reload();
    navigate("/login");
  };
  const onSubmit = () => {};
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <s.Container>
      <h1>Your Settings</h1>
      <s.FormContainer>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <s.FirstInput placeholder="이미지" {...register("img")} />
          <s.SecondInput
            placeholder="Username"
            {...register("username", {
              required: "4자 이상 12자리 이하로 입력해 주세요",
              minLength: {
                value: 4,
                message: "4자 이상의 username을 입력해 주세요",
              },
              maxLength: {
                value: 12,
                message: "12자 이하의 usename을 입력해 주세요",
              },
            })}
          />
          <span>{errors?.username?.message}</span>
          <s.TextArea
            placeholder="Short bio about you"
            type="text"
            {...register("content", {})}
          />
          <s.SecondInput
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "12자 이상 20자 이하로 입력해 주세요",
              minLength: {
                value: 12,
                message: "12자 이상의 email을 입력해 주세요",
              },
              maxLength: {
                value: 20,
                message: "20자 이하의 email을 입력해 주세요",
              },
            })}
          />
          <span>{errors?.email?.message}</span>
          <s.SecondInput
            placeholder="New Password"
            type="password"
            {...register("password", {
              required: "8자 이상 12자 이하로 입력해 주세요",
              minLength: {
                value: 8,
                message: "8자 이상의 password를 입력해 주세요",
              },
              maxLength: {
                value: 12,
                message: "12자 이하의 password를 입력해 주세요",
              },
            })}
          />
          <span>{errors?.password?.message}</span>
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
