import { APIResponse } from "./apis/response";

export type User = {
  _id: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type AuthState = {
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  hasAuthenticated: boolean;
  friendContacts: User[];
};

export type RegisterPayload = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type RegisterResponse = APIResponse & {
  result: {
    verification: string;
  };
};

export type VerifyEmailPayload = {
  verification: string;
};

export type verifyEmailResponse = APIResponse & {
  result: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInResponse = APIResponse & {
  result: {
    user: User;
    accessToken: string;
    refreshToken: string;
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
    accessToken: string;
    refreshToken: string;
  };
};

export type SignInError = {
  type: "SIGN_IN_ERROR";
};

export type RemoveAuth = {
  type: "SIGN_OUT";
};

export type SetFriendContacts = {
  type: "SET_FRIEND_CONTACTS";
  payload: User[];
};

export type AuthActions =
  | RequestAPI
  | RequestAPIComplete
  | SignInError
  | SetAuth
  | RemoveAuth
  | SetFriendContacts;
