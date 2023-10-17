import React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as s from "./style";

import axios from "axios";
import { Cookies } from "react-cookie";
import { removeCookie } from "cookies";

const Setting = () => {
  const cookie = new Cookies();
  const Token = cookie.get("token");
  const userId = cookie.get("userId");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { username, email, password } = watch();

  const onSetting = async (id) => {
    await axios
      .patch(
        `http://localhost:8000/api/users/${id}`,
        {
          username: watch("username"),
          email: watch("email"),
          password: watch("password"),
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        const username = res?.data?.user?.username;
        cookie.set("username", username);
        navigate("/mypage");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.message);
        console.log(error);
      });
  };
  return (
    <s.Container>
      <h1>Your Settings</h1>
      <s.FormContainer>
        <form onSubmit={handleSubmit(() => onSetting(userId))}>
          <s.SecondInput
            type="text"
            placeholder="Username"
            name="username"
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

          <s.SecondInput
            placeholder="Email"
            name="email"
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
            name="password"
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
    </s.Container>
  );
};

export default Setting;
