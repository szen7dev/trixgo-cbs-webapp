import { useContext, useEffect } from "react";
import OneSignalReact from "react-onesignal";

import { useHistory } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import AuthContext from "services/contexts/Auth";
import API from "apis/repository";
import AuthenticationRepository from "apis/authentication";
import { logout } from "redux/reducer/UserInfo"
import { SignInPayload, UseAuth } from "typings/auth";
import { useDispatch } from "react-redux";

export const useAuth = (): UseAuth => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const queryClient = useQueryClient();
  const dispatchRedux = useDispatch()
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

  const { data: dataUserInfo, refetch: refetchDataUserInfo } =
    useQuery("user_info", () => AuthenticationRepository.usersInfo(), { enabled: false });

  const { mutateAsync: signInMutateAsync, isLoading: isSigningIn } =
    useMutation((payload: SignInPayload) =>
      AuthenticationRepository.signIn(payload)
    );

  const ONESIGNAL_APP_ID = process.env.REACT_APP_ENV === 'development'
    ? process.env.REACT_APP_ONESIGNAL_APP_ID_LOCAL
    : process.env.REACT_APP_ONESIGNAL_APP_ID_STAGING;

  const updateDevice = (_id: string) => {
    if ('serviceWorker' in navigator && !navigator.serviceWorker.controller) {
      navigator.serviceWorker.register('/OneSignalSDKWorker.js');
    }
    //console.log({ ONESIGNAL_APP_ID });

    if (ONESIGNAL_APP_ID) {
      OneSignalReact.init({
        appId: ONESIGNAL_APP_ID,
        notifyButton: {
          enable: true,
        },
        autoResubscribe: true,
        // notificationClickHandlerMatch: 'origin',
        // notificationClickHandlerAction: 'focus',
        allowLocalhostAsSecureOrigin: true,
      })
        .then(e => {
          OneSignalReact.isPushNotificationsEnabled().then(function (isEnabled) {
            if (isEnabled)
              console.log("Push notifications are enabled!");
            else {
              console.log("Push notifications are not enabled yet.");
              OneSignalReact.showSlidedownPrompt();
            }
          });

          // case 2: chờ submit allow subscribe tại màn hình hiện tại
          OneSignalReact.on('popoverAllowClick', function () {
            console.log('Slide ALLOW CLICK: popoverAllowClick');

            OneSignalReact.getUserId(async function (oneSignalWebPushID) {
              console.log("🚀 ~ file: useAuth.ts ~ line 96 ~ OneSignalReact.getUserId ~ oneSignalWebPushID", oneSignalWebPushID)
              if (oneSignalWebPushID) {
                const oneSignalId = localStorage.getItem(`oneSignalId_${_id}`);
                if (!oneSignalId || oneSignalId !== oneSignalWebPushID) {
                  localStorage.setItem(`oneSignalId_${_id}`, oneSignalWebPushID);
                  await AuthenticationRepository.updateDevice({
                    platform: process.env.REACT_APP_PLATFORM ?? "1",
                    deviceID: 'BROWSER',
                    deviceName: 'BROWSER',
                    registrationID: oneSignalWebPushID || '',
                    oneSignalID: oneSignalWebPushID || '',
                    env: '1'
                  });
                }
              }
            })
          });

          // case 1: đã subscribe page trước đó
          OneSignalReact.getUserId(async function (oneSignalWebPushID) {
            console.log("🚀 ~ file: useAuth.ts ~ line 116 ~ OneSignalReact.getUserId ~ oneSignalWebPushID", oneSignalWebPushID)
            if (oneSignalWebPushID) {
              const oneSignalId = localStorage.getItem(`oneSignalId_${_id}`);
              if (!oneSignalId || oneSignalId !== oneSignalWebPushID) {
                localStorage.setItem(`oneSignalId_${_id}`, oneSignalWebPushID);
                await AuthenticationRepository.updateDevice({
                  platform: process.env.REACT_APP_PLATFORM ?? "1",
                  deviceID: 'BROWSER',
                  deviceName: 'BROWSER',
                  registrationID: oneSignalWebPushID || '',
                  oneSignalID: oneSignalWebPushID || '',
                  env: '1'
                });
              }
            }
          })

        })
        .catch(e => console.error(e));
    }
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

        // updateDevice(data.user._id);

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
    const user = JSON.parse(localStorage.getItem("currentUser") as string) ?? null;
    const _id = user._id;
    queryClient.clear();
    dispatchRedux(logout());
    localStorage.removeItem(`oneSignalId_${_id}`);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    history.push("/login");
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
    dataUserInfo,
    refetchDataUserInfo,
    updateDevice
  };
};

export const useHistoryTraffics = (): {
  createHistoryTraffics: (payload: any) => Promise<any>;
  loading: boolean;
} => {
  const { mutateAsync, isLoading } = useMutation((payload: any) =>
    AuthenticationRepository.requestHistoryTraffics(payload)
  );
  return {
    createHistoryTraffics: mutateAsync,
    loading: isLoading,
  }
}