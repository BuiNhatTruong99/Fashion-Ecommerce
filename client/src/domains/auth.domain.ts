interface ISignIn {
  email: string;
  password: string;
}

interface ISignInResponse extends IToken {
  userInfo: IUserInfo;
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
  phone?: string;
}

interface IToken {
  accessToken: string;
}

export type { ISignIn, ISignInResponse, ISignUp, IEmailVerification, IUserInfo };
