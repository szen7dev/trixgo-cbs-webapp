import { useContext, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

import AuthContext from "services/contexts/Auth";
import API from "apis/repository";
import AuthenticationRepository from "apis/authentication";

import { User, SignInPayload } from "typings/auth";

type UseAuth = {
  isLoading: boolean;
  hasAuthenticated: boolean;
  user: User | null;
  token: string | null;
  signIn: (payload: SignInPayload) => void;
  signOut: () => void;
};

export const useAuth = (): UseAuth => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const { mutateAsync: signInMutateAsync, isLoading: isSigningIn } =
    useMutation((payload: SignInPayload) =>
      AuthenticationRepository.signIn(payload)
    );

  const {
    isLoading: isLoadingListMedias,
    refetch: refetchListMedias,
    data: dataListMedias,
  } =
    useQuery(                                                   // https://react-query.tanstack.com/reference/useInfiniteQuery
      "list_medias",
      async ({ pageParams }: any) => AuthenticationRepository.listMedias({ lastestID: pageParams ? pageParams : "" }),
      {
        getNextPageParam: ({ nextCursor }: any) => {
          return nextCursor || undefined;
        },
        refetchOnWindowFocus: false,
        enabled: true,                                              // https://react-query.tanstack.com/guides/disabling-queries
      }
    );

  const signIn = async (payload: SignInPayload) => {
    try {
      dispatch({ type: "REQUEST_API" });

      const { error, data, message } = await signInMutateAsync(payload);
      if (!error) {
        dispatch({ type: "SIGN_IN_SUCCESS", payload: data });
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));

        API.defaults.headers.Authorization = `Bearer ${data.token}`;

        toast.success("Đăng nhập thành công");
        history.push("/dashboard");
      } else {
        dispatch({ type: "SIGN_IN_ERROR" });
        toast.error(message);
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
    window.location.reload();
  };

  const getUserInfo = () => {

  }

  useEffect(() => {
    if (
      localStorage.getItem("currentUser") === null ||
      localStorage.getItem("token") === null
    ) {
      dispatch({ type: "SIGN_IN_ERROR" });
    } else {
      API.defaults.headers.Authorization = `Bearer ${JSON.parse(
        localStorage.getItem("token") as string
      )}`;

      dispatch({
        type: "SIGN_IN_SUCCESS",
        payload: {
          user: JSON.parse(localStorage.getItem("currentUser") as string),
          token: localStorage.getItem("token") as string
        },
      });
    }
  }, [dispatch]);

  return {
    isLoading:
      isSigningIn,
    hasAuthenticated:
      !!localStorage.getItem("currentUser") &&
      !!localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("currentUser") as string) ?? null,
    token: JSON.parse(localStorage.getItem("token") as string),
    signIn,
    signOut,
  };
};
