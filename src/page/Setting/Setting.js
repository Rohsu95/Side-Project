import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { updateEmail } from "firebase/auth";
import React from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as s from "./style";

const Setting = ({ user }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onError = (errors) => {
    console.log(errors);
  };

  // 이메일,비밀번호,displayName 수정
  const onSetting = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    const { displayname, email, password } = watch();
    updateEmail(user, email)
      .then(() => {
        user.getIdToken();
      })
      .then((token) => {
        return updatePassword(user, password);
      })
      .then(() => {
        updateProfile(user, { displayName: displayname });
      })
      .then(() => {
        alert("수정 되었습니다.");
        navigate("/mypage");
        console.log("수정 된다");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("접속 시간이 초과하였습니다. 새로 로그인 해주세요");
      });
  };
  console.log(user);

  return (
    <s.Container>
      <h1>Your Settings</h1>
      <s.FormContainer>
        <form onSubmit={handleSubmit(onSetting, onError)}>
          <s.SecondInput
            type="text"
            placeholder="Username"
            name="displayname"
            {...register("displayname", {
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
          <span>{errors?.displayname?.message}</span>

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
