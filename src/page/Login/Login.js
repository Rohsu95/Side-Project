import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/Theme";
const Container = styled.div`
  margin-top: 2rem;
`;

const Sign = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  .signup {
    display: inline;
  }
  h1 {
    margin-bottom: 1rem;
  }
`;
const SignupLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.main};
`;
const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  span {
    font-size: 0.75rem;
    display: block;
    margin-bottom: 1.25rem;
    color: red;
  }

  .Input {
    /* border: 2px solid red; */
    /* width: 150%; */
    /* padding: 0.75rem 8rem; */
    width: 30rem;
    height: 3.25rem;
    padding: 0 0.75rem;
    font-size: 1.25rem;
    display: block;
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray_03};
    @media ${theme.media.height} {
      width: 20rem;
    }
  }
  button {
    border: 0;
    width: 6rem;
    float: right;
    height: 2.75rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: ${theme.fontSizes.fs1};
    color: ${theme.colors.white};
    background-color: ${theme.colors.main};
  }
`;
// 유저에 정보가 들어가야해
//
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // 쿠키 토큰 쓰는 법으로 넣어보기
  // 메인 화면 먼저 만들고 로그인 시 헤더 바꾸고 뉴 포스트 후 셋팅 ㄱ
  // 저녁에 먼저 메인 때 로그인 시 토큰 찍히는지 확인 하고 하자
  // http://localhost:1337/api/auth/local/register
  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:1337/api/auth/local", {
        identifier: data.identifier,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        console.log(data);
      });
  };
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Container>
      <Sign>
        <h1>Sign In</h1>
        <SignupLink to="/signup">
          <p className="signup">Need an account?</p>
        </SignupLink>
      </Sign>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <input
            {...register("identifier", {
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
          <span>{errors?.identifier?.message}</span>

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
      </FormContainer>
    </Container>
  );
};
export default Login;
