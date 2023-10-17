// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import * as s from "./style";
// import axios from "axios";
// import { useState } from "react";
// import imageCompression from "browser-image-compression";

// const Signup = () => {
//   const [file, setFile] = useState(null);
//   // 이코드를 수정해도 백엔드 때문에 이미지가 기본 이미지가 박힌다.그렇기에 이 코드 없어도 될거 같다.
//   const basic =
//     "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();

//   // 포스트맨으로 이미지를 보내던지 이미지를 안보내도 기본 이미지가 보내진다.
//   //
//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();

//       formData.append("avatar", file);
//       formData.append("email", watch("email"));
//       formData.append("password", watch("password"));
//       formData.append("username", watch("username"));

//       const res = await axios.post(
//         "http://localhost:8000/api/users/signup",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("회원 가입 성공", res);
//       // console.log("formData 성공", formData);
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//       // alert(err.response.data.message);
//     }
//   };
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };
//   // console.log(file);

//   const handleDeletePreview = () => {
//     setFile(null);
//   };

//   // 회원 가입 로그인 버튼 완료 게시글, 게시글 수정 버튼 호버 시 클자색은 바뀌는데 배경이 안바귄다 한번 찾아보자
//   return (
//     <s.Container>
//       <s.Sign>
//         <h1>Sign up</h1>
//         <s.SignupLink to="/login">
//           <p className="signup">Have an account?</p>
//         </s.SignupLink>
//       </s.Sign>
//       <s.FormContainer>
//         <form
//           action="/upload"
//           encType="multipart/form-data"
//           onSubmit={handleSubmit(handleUpload)}
//         >
//           <s.ImgDiv className={file ? "" : "imgLine"}>
//             {file && (
//               <>
//                 <img
//                   className="EditImg"
//                   src={URL.createObjectURL(file)}
//                   alt="이미지 사진"
//                 />
//                 <button className="DeleteBtn" onClick={handleDeletePreview}>
//                   X
//                 </button>
//               </>
//             )}
//           </s.ImgDiv>

//           <label htmlFor="input-file" className="label-file">
//             프로필 이미지 추가
//           </label>
//           <input
//             type="file"
//             id="input-file"
//             accept="image/*"
//             name="avatar"
//             onChange={handleFileChange}
//             style={{ display: "none" }}
//           />

//           <input
//             type="text"
//             className="Input"
//             placeholder="Username"
//             {...register("username", {
//               required: "4자 이상 12자리 이하의 username을 입력해 주세요",
//               minLength: {
//                 value: 4,
//                 message: "4자 이상의 username을 입력해 주세요",
//               },
//               maxLength: {
//                 value: 12,
//                 message: "12자 이하의 usename을 입력해 주세요",
//               },
//             })}
//           />
//           <span>{errors?.username?.message}</span>
//           <input
//             type="email"
//             className="Input"
//             placeholder="Email"
//             {...register("email", {
//               required: "12자 이상 20자 이하의 email을 입력해 주세요",
//               minLength: {
//                 value: 12,
//                 message: "12자 이상의 email을 입력해 주세요",
//               },
//               maxLength: {
//                 value: 20,
//                 message: "20자 이하의 email을 입력해 주세요",
//               },
//             })}
//           />
//           <span>{errors?.email?.message}</span>
//           <input
//             type="password"
//             className="Input"
//             placeholder="Password"
//             {...register("password", {
//               required: "8자 이상 12자 이하의 password를 입력해 주세요",
//               minLength: {
//                 value: 8,
//                 message: "8자 이상의 password를 입력해 주세요",
//               },
//               maxLength: {
//                 value: 12,
//                 message: "12자 이하의 password를 입력해 주세요",
//               },
//             })}
//           />
//           <span>{errors?.password?.message}</span>
//           <button className="SignBtn">Sign up</button>
//           {/* </div> */}
//         </form>
//       </s.FormContainer>
//     </s.Container>
//   );
// };
// export default Signup;

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as s from "./style";
import axios from "axios";
import { useState } from "react";
import imageCompression from "browser-image-compression";
// 2~3시 까지 안되면 그냥 이미지 없애고 수정 부분에 이미지 업로드를 나두자
const Signup = () => {
  const [file, setFile] = useState();
  // 이코드를 수정해도 백엔드 때문에 이미지가 기본 이미지가 박힌다.그렇기에 이 코드 없어도 될거 같다.
  const basic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // 오후에는 한번더 회원 가입 이미지 넣고와 안넣고 되는지 확인해보고 되면 전에 했던 코드를 다시 넣어서 되는지 확인해보자
  // 그리고 이미지 엑박 나오는데 이걸 만약 같은 이미지 파일에 넣고 되는지 확인 해보자
  // 아니면 이미지가 hhtps로 되어 있으니 그냥 저거 말고 고양이.png 이런 방식의 이미지도 되는지 확인하자
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
      // console.log("formData 성공", formData);
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDeletePreview = () => {
    setFile(null);
  };
  //

  // 밑에거 2개가 되는 애들
  // const onChangeImg = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   if (e.target.files) {
  //     const uploadFile = e.target.files[0];
  //     formData.append("file", uploadFile);
  //     setFile(uploadFile);
  //     console.log(uploadFile);
  //     console.log("===useState===");
  //     console.log(file);
  //   }
  // };

  // const onClickLogin2 = () => {
  //   const formData = new FormData();

  //   formData.append("avatar", file);
  //   formData.append("email", watch("email"));
  //   formData.append("password", watch("password"));
  //   formData.append("username", watch("username"));
  //   axios({
  //     method: "post",
  //     url: "http://localhost:8000/api/users/signup",
  //     data: formData,
  //   })
  //     .then((result) => {
  //       console.log("요청성공");
  //       console.log(result);
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       console.log("요청실패");
  //       console.log(error);
  //     });
  // };

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
          <button className="SignBtn">Sign up</button>
          {/* </div> */}
        </form>
      </s.FormContainer>
    </s.Container>
  );
};
export default Signup;
