import axios from "axios";
import { authService } from "fBase";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as s from "./style";
// 유저에 정보가 들어가야해
//
const Login = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        authService,
        data.email,
        data.password
      );

      console.log("user", user);
      const token = user.refreshToken;
      cookie.set("token", token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    //   await axios
    //     .post("http://localhost:1337/api/auth/local", {
    //       identifier: data.identifier,
    //       password: data.password,
    //     })
    //     .then((res) => {
    //       const token = res.data.jwt;
    //       cookie.set("token", token);
    //       const userEmail = res.data.user.email;
    //       const userName = res.data.user.username;
    //       localStorage.setItem("userEmail", userEmail);
    //       localStorage.setItem("username", userName);
    //       localStorage.setItem("token", token);
    //       console.log(res);
    //       navigate("/");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       console.log(data);
    //     });
  };
  const onError = (errors) => {
    console.log(errors);
  };
  // 현재 상황 회원가입 완료 된거 같고 로그인은 통신 연결 했고 토큰 받아야 하며 글 쓰기에서 아직 이메일이 저장이 안됌 ㅅㅂ ㄴㅌ
  return (
    <s.Container>
      <s.Sign>
        <h1>Sign In</h1>
        <s.SignupLink to="/signup">
          <p className="signup">Need an account?</p>
        </s.SignupLink>
      </s.Sign>
      <s.FormContainer>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input
            {...register("email", {
              required: "12자 이상 20자 이하의 email을 입력해 주세요",
              minLength: {
                value: 12,
                message: "12자 이상의 email 입력해 주세요",
              },
              maxLength: {
                value: 20,
                message: "20자 이하의 email을 입력해 주세요",
              },
            })}
            type="email"
            className="Input"
            placeholder="Email"
          />
          <span>{errors?.email?.message}</span>

          <input
            className="Input"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "8자 이상 12자 이하의 password를 입력해 주세요",
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
          <button>Sign in</button>
        </form>
      </s.FormContainer>
    </s.Container>
  );
};
export default Login;
