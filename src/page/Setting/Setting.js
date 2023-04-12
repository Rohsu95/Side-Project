import React, { useState } from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../Cookies";
import * as s from "./style";

const Setting = ({ displayName, user }) => {
  // const [img, setImg] = useState();
  // const [userName, setUserName] = useState(displayName);
  // const [test, setTest] = useState();
  // const [email, setEmail] = useState(user.email);
  // const [password, setPassword] = useState();
  console.log(user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {};
  const onError = (errors) => {
    console.log(errors);
  };
  // 이 페이지는 안쓰는 걸로 하자 그냥 준비중입니다 로 띄우던가 간단한 기능만 넣던가 하자
  return (
    <s.Container>
      <h1>Your Settings</h1>
      <s.FormContainer>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <s.FirstInput placeholder="이미지" {...register("img")} />
          <s.SecondInput
            placeholder="Username"
            // value={userName}
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
            // value={email}
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
