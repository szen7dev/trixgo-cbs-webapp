import { FC, ReactNode, useReducer } from "react";

import AuthContext, { initialState } from "services/contexts/Auth";

import { AuthState, AuthActions } from "typings/auth";

type Props = {
  children: ReactNode;
};

const reducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case "REQUEST_API":
      return {
        ...state,
        isLoading: true,
      };
    case "REQUEST_API_COMPLETE":
      return {
        ...state,
        isLoading: false,
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        hasAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
      };
    case "SIGN_IN_ERROR":
      return {
        ...state,
        hasAuthenticated: false,
        isLoading: false,
      };
    case "SIGN_OUT":
      return {
        ...state,
        hasAuthenticated: false,
        user: null,
        token: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

const AuthProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer<
    (state: AuthState, action: AuthActions) => AuthState
  >(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
