import { Dispatch, createContext } from "react";

import { AuthState, AuthActions } from "typings/auth";

export const initialState: AuthState = {
  isLoading: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  hasAuthenticated: false,
  friendContacts: [],
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default AuthContext;
