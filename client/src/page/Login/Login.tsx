import React from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../api/userAPI";
import { ILogin, ILoginProps } from "../../types/auth";

const Login = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILogin>();

  const { mutate } = useMutation({
    mutationKey: ["LOGIN_KEY"],
    mutationFn: loginUser,
    onSuccess: (data: ILoginProps) => {
      const { userId, token, username, image } = data;
      cookie.set("token", token);
      cookie.set("userId", userId);
      cookie.set("username", username);
      cookie.set("image", image);
      navigate("/");
      queryClient.invalidateQueries();
      window.location.reload();
    },
  });

  const onSubmit = () => {
    mutate({
      email: watch("email"),
      password: watch("password"),
    });
  };

  return (
    <s.Container>
      <s.Sign>
        <h1>Sign In</h1>
        <s.SignupLink to="/signup">
          <p className="login">Need an account?</p>
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
