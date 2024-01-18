import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SignupUser } from "api/userAPI";

const Signup = () => {
  const [file, setFile] = useState();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: "SIGN_UP",
    mutationFn: SignupUser,
    onSuccess: (data) => {
      // console.log(data);
      queryClient.invalidateQueries();
      if (data !== undefined) {
        navigate("/login");
      }
    },
  });

  const handleUpload = () => {
    const formData = new FormData();

    formData.append("avatar", file);
    formData.append("email", watch("email"));
    formData.append("password", watch("password"));
    formData.append("username", watch("username"));

    mutate(formData);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDeletePreview = () => {
    setFile(null);
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
        <form
          action="/upload"
          encType="multipart/form-data"
          onSubmit={handleSubmit(handleUpload)}
        >
          <s.ImgDiv className={file ? "" : "imgLine"}>
            {file && (
              <>
                <img
                  className="EditImg"
                  src={URL.createObjectURL(file)}
                  alt="이미지 사진"
                />
                <button className="DeleteBtn" onClick={handleDeletePreview}>
                  X
                </button>
              </>
            )}
          </s.ImgDiv>

          <label htmlFor="input-file" className="label-file">
            프로필 이미지 추가
          </label>
          <input
            type="file"
            id="input-file"
            accept="image/*"
            name="avatar"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

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
                value: 10,
                message: "10자 이하의 usename을 입력해 주세요",
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
          <button className="SignBtn">Sign up</button>
        </form>
      </s.FormContainer>
    </s.Container>
  );
};
export default Signup;
