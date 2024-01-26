import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import { Cookies } from "react-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUser } from "../../api/userAPI";
import { ISignUp } from "../../types/auth";
import { removeCookie } from "../../cookies";

const Setting = () => {
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUp>();

  // 수정 기능
  const { mutate } = useMutation({
    mutationKey: ["PATCH"],
    mutationFn: (data: ISignUp) => patchUser(userId, data),

    onSuccess: (data) => {
      alert("정보 수정에 성공하였습니다.");
      const username = data?.user?.username;
      removeCookie("username");
      cookie.set("username", username);
      navigate("/mypage");
      queryClient.invalidateQueries();
    },
  });

  const onSetting = () => {
    mutate({
      username: watch("username"),
      email: watch("email"),
      password: watch("password"),
    });
  };

  return (
    <s.Container>
      <h1>Your Settings</h1>
      <s.FormContainer>
        <form onSubmit={handleSubmit(onSetting)}>
          <s.SecondInput
            type="text"
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
    </s.Container>
  );
};

export default Setting;
