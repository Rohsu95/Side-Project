import { authService } from "fBase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as s from "./style";

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

      const token = user.refreshToken;
      cookie.set("token", token);
      console.log("user", user);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const onError = (errors) => {
    console.log(errors);
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
