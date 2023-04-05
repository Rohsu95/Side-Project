import { authService, db, firebase } from "fBase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as s from "./style";

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        authService,
        data.email,
        data.password
      );
      console.log("user", user);
      // displayName
      await updateProfile(user, { displayName: data.username });

      navigate("/login");
    } catch (error) {
      alert("이미 가입된 정보 입니다");
    }
  };

  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <s.Container>
      <s.Sign>
        <h1>Sign up</h1>
        <s.SignupLink to="/login">
          <p className="signup">Have an account?</p>
        </s.SignupLink>
      </s.Sign>
      <s.FormContainer>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input
            type="text"
            className="Input"
            placeholder="Username"
            {...register("username", {
              required: "4자 이상 12자리 이하의 username을 입력해 주세요",
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
          <input
            type="email"
            className="Input"
            placeholder="Email"
            {...register("email", {
              required: "12자 이상 20자 이하의 email을 입력해 주세요",
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
          <input
            type="password"
            className="Input"
            placeholder="Password"
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
          <button
            onClick={() =>
              setError("email", { type: "focus" }, { shouldFocus: true })
            }
          >
            Sign up
          </button>
        </form>
      </s.FormContainer>
    </s.Container>
  );
};
export default Signup;
