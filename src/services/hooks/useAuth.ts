import { useContext, useEffect } from "react";

import { useHistory } from "react-router-dom";
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from "react-query";
import { toast } from "react-toastify";

import AuthContext from "services/contexts/Auth";
import API from "apis/repository";
import AuthenticationRepository from "apis/authentication";

import {
  User,
  RegisterPayload,
  VerifyEmailPayload,
  SignInPayload,
} from "typings/auth";
import UserRepository from "apis/user";

type UseAuth = {
  isLoading: boolean;
  hasAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  friendContacts: User[];
  fetchFriendContacts: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<void, unknown>>;
  register: (payload: RegisterPayload) => Promise<void>;
  signIn: (payload: SignInPayload) => void;
  signOut: () => void;
};

export const useAuth = (): UseAuth => {
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();

  const { mutateAsync: registerMutateAsync, isLoading: isRegistering } =
    useMutation((payload: RegisterPayload) =>
      AuthenticationRepository.register(payload)
    );
  const { mutateAsync: verifyEmailMutateAsync, isLoading: isVerifyingEmail } =
    useMutation((payload: VerifyEmailPayload) =>
      AuthenticationRepository.verifyEmail(payload)
    );
  const { mutateAsync: signInMutateAsync, isLoading: isSigningIn } =
    useMutation((payload: SignInPayload) =>
      AuthenticationRepository.signIn(payload)
    );
  const { refetch: fetchFriendContacts, isLoading: isGettingFriendContacts } =
    useQuery(
      "getFriendContacts",
      async () => {
        try {
          const { isSuccess, message, result } =
            await UserRepository.getFriendContacts({
              userId: JSON.parse(localStorage.getItem("currentUser") as string)
                ._id,
            });

          if (isSuccess) {
            dispatch({
              type: "SET_FRIEND_CONTACTS",
              payload: result,
            });
          } else {
            toast.error(message);
          }
        } catch (error) {
          toast.error(error.message);
          throw new Error(error.message);
        }
      },
      {
        enabled: false,
        refetchOnWindowFocus: false,
      }
    );

  const register = async (payload: RegisterPayload) => {
    try {
      dispatch({ type: "REQUEST_API" });

      const { isSuccess, message, result } = await registerMutateAsync(payload);

      if (isSuccess) {
        const { isSuccess: isVerifyEmailSuccess, message: verifyEmailMessage } =
          await verifyEmailMutateAsync({
            verification: result.verification,
          });

        if (isVerifyEmailSuccess) {
          toast.success(verifyEmailMessage);
          history.push("/authentication/sign-in");
        } else {
          toast.error(verifyEmailMessage);
        }
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const signIn = async (payload: SignInPayload) => {
    try {
      dispatch({ type: "REQUEST_API" });

      const { isSuccess, message, result } = await signInMutateAsync(payload);

      if (isSuccess) {
        dispatch({ type: "SIGN_IN_SUCCESS", payload: result });

        localStorage.setItem("currentUser", JSON.stringify(result.user));
        localStorage.setItem("accessToken", JSON.stringify(result.accessToken));
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(result.refreshToken)
        );

        API.defaults.headers.Authorization = `Bearer ${result.accessToken}`;

        toast.success(message);
        history.push("/messages");
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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    toast.success("Sign out successfully!");
    history.push("/authentication/sign-in");
  };

  useEffect(() => {
    if (
      localStorage.getItem("currentUser") === null ||
      localStorage.getItem("accessToken") === null ||
      localStorage.getItem("refreshToken") === null
    ) {
      dispatch({ type: "SIGN_IN_ERROR" });
    } else {
      API.defaults.headers.Authorization = `Bearer ${JSON.parse(
        localStorage.getItem("accessToken") as string
      )}`;

      dispatch({
        type: "SIGN_IN_SUCCESS",
        payload: {
          user: JSON.parse(localStorage.getItem("currentUser") as string),
          accessToken: localStorage.getItem("accessToken") as string,
          refreshToken: localStorage.getItem("refreshToken") as string,
        },
      });
    }
  }, [dispatch]);

  return {
    isLoading:
      isSigningIn ||
      isRegistering ||
      isVerifyingEmail ||
      isGettingFriendContacts,
    hasAuthenticated:
      !!localStorage.getItem("currentUser") &&
      !!localStorage.getItem("accessToken") &&
      !!localStorage.getItem("refreshToken"),
    user: JSON.parse(localStorage.getItem("currentUser") as string) ?? null,
    accessToken: JSON.parse(localStorage.getItem("accessToken") as string),
    refreshToken: JSON.parse(localStorage.getItem("refreshToken") as string),
    friendContacts: state.friendContacts,
    fetchFriendContacts,
    register,
    signIn,
    signOut,
  };
};
