import { authService, firebase } from "fBase";
import {
  getAuth,
  getIdTokenResult,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { updateEmail } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as s from "./style";

const Setting = ({ user }) => {
  // const [img, setImg] = useState();
  // const [names, setNames] = useState(user?.displayName);
  // const [test, setTest] = useState();
  // const [email, setEmail] = useState(user.email);
  // const [password, setPassword] = useState();

  const [change, setChange] = useState({
    displayname: "",
    email: "",
    password: "",
  });
  const { displayname, email, password } = change;
  const onChange = (event) => {
    const { name, value } = event.target;
    setChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(change);

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

  // 이메일,비밀번호,displayName 수정
  const onSetting = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    // Firebase 인증 시스템에서는 이메일 변경 같은 민감한 정보 수정 할때 마다 유저의 로그인 상태확인하고
    // 토큰을 재발급 받아야 한다
    updateEmail(user, change.email)
      .then(() => {
        alert("수정 되었습니다.");
        return user.getIdToken();
      })
      .then((token) => {
        return updatePassword(user, change.password);
      })
      .then(() => {
        console.log("비밀번호가 수정되었습니다.");
      })
      .then(() => {
        updateProfile(user, { displayName: change.displayname });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 이 페이지는 안쓰는 걸로 하자 그냥 준비중입니다 로 띄우던가 간단한 기능만 넣던가 하자
  return (
    <s.Container>
      <h1>Your Settings</h1>
      <s.FormContainer>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <s.SecondInput
            type="text"
            placeholder="Username"
            name="displayname"
            value={change.displayname}
            onChange={onChange}
            // {...register("username", {
            //   required: "4자 이상 12자리 이하로 입력해 주세요",
            //   minLength: {
            //     value: 4,
            //     message: "4자 이상의 username을 입력해 주세요",
            //   },
            //   maxLength: {
            //     value: 12,
            //     message: "12자 이하의 usename을 입력해 주세요",
            //   },
            // })}
          />
          <span>{errors?.username?.message}</span>

          <s.SecondInput
            placeholder="Email"
            name="email"
            type="email"
            value={change.email}
            onChange={onChange}

            // {...register("email", { 이게 있으면 onchange안먹힘 그리고 벨류가 안먹힘
            //   required: "12자 이상 20자 이하로 입력해 주세요",
            //   minLength: {
            //     value: 12,
            //     message: "12자 이상의 email을 입력해 주세요",
            //   },
            //   maxLength: {
            //     value: 20,
            //     message: "20자 이하의 email을 입력해 주세요",
            //   },
            // })}
          />
          <span>{errors?.email?.message}</span>
          <s.SecondInput
            placeholder="New Password"
            type="password"
            name="password"
            value={change.password}
            onChange={onChange}
            // {...register("password", {
            //   required: "8자 이상 12자 이하로 입력해 주세요",
            //   minLength: {
            //     value: 8,
            //     message: "8자 이상의 password를 입력해 주세요",
            //   },
            //   maxLength: {
            //     value: 12,
            //     message: "12자 이하의 password를 입력해 주세요",
            //   },
            // })}
          />
          <span>{errors?.password?.message}</span>
          <s.SettingBtn onClick={onSetting}>Update Settings</s.SettingBtn>
        </form>
      </s.FormContainer>
    </s.Container>
  );
};

export default Setting;
