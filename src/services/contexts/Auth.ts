import { Dispatch, createContext } from "react";

import { AuthState, AuthActions } from "typings/auth";

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
  isLoading: false,
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthActions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export default AuthContext;
