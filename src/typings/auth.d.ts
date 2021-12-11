import { APIResponse } from "./apis/response";

export type User = {
  _id: string;
  email: string,
  phone: string,
  fullname: string,
  company: string,
  signature: string,
  status: number,
  level: number,
  image: string
};

export type AuthState = {
  isLoading: boolean;
  token: string | null;
  user: User | null;
  hasAuthenticated: boolean;
};

export type SignInPayload = {
  email: string;
  password: string;
  platform: string;
};

export type SignInResponse = APIResponse & {
  data: {
    user: User;
    token: string;
  };
};

export type RequestAPI = {
  type: "REQUEST_API";
};

export type RequestAPIComplete = {
  type: "REQUEST_API_COMPLETE";
};

export type SetAuth = {
  type: "SIGN_IN_SUCCESS";
  payload: {
    user: User;
    token: string;
  };
};

export type SignInError = {
  type: "SIGN_IN_ERROR";
};

export type RemoveAuth = {
  type: "SIGN_OUT";
};

export type AuthActions =
  | RequestAPI
  | RequestAPIComplete
  | SignInError
  | SetAuth
  | RemoveAuth;

export type UserInfoResponse = APIResponse & {
  data: User;
};
