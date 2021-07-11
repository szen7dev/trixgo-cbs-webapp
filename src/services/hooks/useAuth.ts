import { useContext } from "react";

import { useHistory } from "react-router-dom";

import AuthContext from "services/contexts/Auth";

import { sleep } from "helpers/time";

import { User, SignInPayload } from "typings/auth";

type UseAuth = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  signIn: (payload: SignInPayload) => void;
  signOut: () => void;
};

export const useAuth = (): UseAuth => {
  const { dispatch, state } = useContext(AuthContext);
  const history = useHistory();

  const signIn = async (_payload: SignInPayload) => {
    try {
      dispatch({ type: "REQUEST_SIGN_IN" });

      await sleep(2500);

      const data = {
        user: {
          _id: "496f90ce-e2a1-4c56-966f-2df3aeecd548",
          image:
            "https://s120-ava-talk.zadn.vn/0/1/8/c/16/120/b773acbcc956e49d521e43f304a53d9f.jpg",
          email: "letrunghieu.nalee@gmail.com",
          userName: "NALee",
          firstName: "Hiếu",
          lastName: "Lê",
        },
        token: "5e60f12591e6794c8e13190a",
      };

      if (data.user) {
        dispatch({ type: "SIGN_IN_SUCCESS", payload: data });
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        history.push("/messages");
      } else {
        dispatch({ type: "SIGN_IN_ERROR" });
      }
    } catch (error) {
      dispatch({ type: "SIGN_IN_ERROR" });
    }
  };

  const signOut = () => {
    dispatch({
      type: "SIGN_OUT",
    });
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  };

  return {
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    user: state.user,
    token: state.token,
    signIn,
    signOut,
  };
};
