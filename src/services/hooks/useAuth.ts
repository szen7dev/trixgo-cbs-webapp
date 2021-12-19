import { useContext, useEffect } from "react";
import OneSignalReact from "react-onesignal";

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
  dataUserInfo: any;
};

export const useAuth = (): UseAuth => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

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

  const { data: dataUserInfo } =
    useQuery("user_info", () => AuthenticationRepository.usersInfo());

  const { mutateAsync: signInMutateAsync, isLoading: isSigningIn } =
    useMutation((payload: SignInPayload) =>
      AuthenticationRepository.signIn(payload)
    );

  const updateDevice = () => {
    if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
      navigator.serviceWorker.register('/OneSignalSDKWorker.js');
    }

    OneSignalReact.init({
      appId: "79acfc09-966a-48f5-a9ea-44d90410014f",
      notifyButton: {
        enable: true,
      },
      notificationClickHandlerMatch: 'origin',
      notificationClickHandlerAction: 'focus',
  
      allowLocalhostAsSecureOrigin: true,
    })
    .then(e => {
      console.log({ e });
      
      OneSignalReact.getUserId(async function(oneSignalWebPushID) {
        console.log({ oneSignalWebPushID });
        
        await AuthenticationRepository.updateDevice({
          platform: 'BROWSER',
          deviceID: 'BROWSER',
          deviceName: 'BROWSER',
          registrationID: oneSignalWebPushID || '',
          oneSignalID: oneSignalWebPushID || '',
        });
      });
    })
    .catch(e => console.error(e));
  }

  const signIn = async (payload: SignInPayload) => {
    try {
      dispatch({ type: "REQUEST_API" });

      const { error, data, message } = await signInMutateAsync(payload);
      if (!error) {
        dispatch({ type: "SIGN_IN_SUCCESS", payload: data });
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.token));

        API.defaults.headers.Authorization = `Bearer ${data.token}`;

        updateDevice();

        toast.success("Đăng nhập thành công");
        history.push("/");
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
    dataUserInfo
  };
};
