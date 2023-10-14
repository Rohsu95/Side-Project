import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import axios from "axios";
import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";

const Signup = () => {
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // const fileReader = new FileReader();
  // console.log(fileReader);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("email", watch("email"));
      formData.append("password", watch("password"));
      formData.append("username", watch("username"));

      const res = await axios.post(
        "http://localhost:8000/api/users/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("회원 가입 성공", res);
      console.log("formData 성공", formData);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  console.log("file 정보", file);
  // 회원 가입 하면 회원 가입 정보에 이미지가 박힌다.
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
          <s.ImgDiv>
            <img className="EditImg" src={file?.name} alt="기본 이미지" />
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
          <button>Sign up</button>
        </form>
      </s.FormContainer>
    </s.Container>
  );
};
export default Signup;

// const onSubmit = async (data) => {
// try {
//   axios
//     .post("http://localhost:8000/api/users/signup", data, {
//       headers: { "Content-Type": "application/json" },
//     })
//     .then((res) => console.log("회원 가입쪽?", res));
//   // navigate("/login");
// } catch (err) {
//   console.log(err);
// }
// };
