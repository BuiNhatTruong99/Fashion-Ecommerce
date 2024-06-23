interface IAuthResponse {
  accessToken: string;
}

interface ISignIn {
  email: string;
  password: string;
}

interface ISignUp {
  fullName: string;
  email: string;
  password: string;
}

export type { IAuthResponse, ISignIn, ISignUp };
