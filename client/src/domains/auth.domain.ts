interface IAuthResponse {
  userInfo: IUserInfo;
  accessToken: string;
}

interface ISignIn {
  email: string;
  password: string;
}

interface ISignUp {
  email: string;
}

interface IEmailVerification {
  email: string;
  fullName: string;
  password: string;
  otp: string;
}

interface IUserInfo {
  email: string;
  fullName: string;
  phone: string;
}

export type { IAuthResponse, ISignIn, ISignUp, IEmailVerification, IUserInfo };
