// 로그인 시 필요한 정보
export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginProps {
  token?: string;
  userId?: string;
  email?: string;
  username?: string;
  image?: string;
}

// 회원 가입 작성할 때 필요한 정보
export interface ISignUp {
  username: string;
  email: string;
  password: string;
  image?: string;
}

// 회원 가입 성공 하면 담기는 정보
export interface ISignUpProps {
  user: string;
  email: string;
  token: string;
  image: string;
}
