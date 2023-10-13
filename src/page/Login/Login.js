import React from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import { login } from "api/userAPI";

const Login = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // user 정보

  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      if (res?.response?.data?.status) {
        alert("가입된 정보가 없습니다.");
      } else if (res?.status === 200) {
        const userId = res?.data?.userId;
        const token = res?.data?.token;
        const username = res?.data?.username;
        cookie.set("token", token);
        cookie.set("userId", userId);
        cookie.set("username", username);
        navigate("/");

        console.log("로그인 쪽", res);
        window.location.reload();
      } else {
        alert("잠시 후에 로그인을 해주세요 .");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <s.Container>
      <s.Sign>
        <h1>Sign In</h1>
        <s.SignupLink to="/signup">
          <p className="signup">Need an account?</p>
        </s.SignupLink>
      </s.Sign>
      <s.FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
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
