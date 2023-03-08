import { useForm } from "react-hook-form";
import { Link, useSubmit } from "react-router-dom";
import styled from "styled-components";
import theme from "../../styles/Theme";
const Container = styled.div``;
const SignupLink = styled(Link)`
  text-decoration: none;
  color: ${theme.colors.main};
`;
const Sign = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  .signup {
    display: inline;
  }
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
const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <Container>
      <Sign>
        <h1>Sign up</h1>
        <SignupLink to="/login">
          <p className="signup">Have an account?</p>
        </SignupLink>
      </Sign>
      <FormContainer>
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
      </FormContainer>
    </Container>
  );
};
export default Signup;
