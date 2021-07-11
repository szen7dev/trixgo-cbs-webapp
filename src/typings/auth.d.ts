export type User = {
  _id: string;
  image: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  isLoading: boolean;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type CallSignInAPI = {
  type: "REQUEST_SIGN_IN";
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

export type AuthActions = CallSignInAPI | SignInError | SetAuth | RemoveAuth;
