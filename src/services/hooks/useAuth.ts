import { useContext, useEffect } from "react";
import OneSignalReact from "react-onesignal";

import { useHistory } from "react-router-dom";
import { useInfiniteQuery, useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";

import AuthContext from "services/contexts/Auth";
import API from "apis/repository";
import AuthenticationRepository from "apis/authentication";

import { User, SignInPayload, UseAuth, UseGetListAppOfUser, UseCheckPermission, UseCheckPermissionOneMenu } from "typings/auth";

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
    console.log({ ONESIGNAL_APP_ID });

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
          console.log({ e });
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
    localStorage.removeItem(`oneSignalId_${_id}`);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    history.push("/authentication/sign-in");
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

// 1. Lấy danh sách ứng dụng của 1 user được truy cập
export const useGetListAppOfUser = (): UseGetListAppOfUser => {
  const {
    isLoading: isLoadingAppUsers,
    refetch: refetchAppUsers,
    data: dataReturnFromAPIAppUsers,
    fetchNextPage: nextPageAppUsers
  } =
    useInfiniteQuery(
      "app_users/list-app-of-user",
      async ({ pageParams }: any) =>
        AuthenticationRepository.getListAppOfUser({
          lastestID: pageParams ? pageParams : "",
        }),
      {
        getNextPageParam: ({ nextCursor }: any) => {
          return nextCursor || undefined;
        },
        refetchOnWindowFocus: true,
        enabled: false
      }
    );
  const listAppOfUser = [].concat(...(dataReturnFromAPIAppUsers?.pages || []).map((d: any) => d.data?.listRecords));

  return {
    isLoadingAppUsers,
    refetchAppUsers,
    nextPageAppUsers,
    listAppOfUser
  }
};

// 2. Check quyền truy cập vào 1 app tổng
export const useCheckPerAccessApp = (appID: string): UseCheckPermission => {
  const { isSuccess, data } =
    useQuery(`check-permissions-access-app?appID=${appID}`, () => AuthenticationRepository.checkPermissionsAccessApp(appID), {
      refetchOnWindowFocus: true
    });

  let hasPermission = true;
  if (isSuccess && data?.data?.keyError == 'permission_denied') {

    hasPermission = false;
  }
  console.log("check-permissions-access-app", data);
  return {
    hasPermission,
    isSuccess
  };
};

// 3. Lấy danh sách MENU của hệ thống
export const useGetListAppMenu = (appID: string, parentID?: string): any => {
  const {
    isLoading: isLoadingGetListAppMenu,
    refetch: refetchGetListAppMenu,
    data: dataReturnFromAPIGetListAppMenu,
    fetchNextPage: nextPageGetListAppMenu
  } =
    useInfiniteQuery(
      `app_menus?appID=${appID}$parentID=${parentID}`,
      async ({ pageParams }: any) =>
        AuthenticationRepository.getListAppMenu({
          appID: appID,
          parentID: parentID ? parentID : "",
          select: "name slug order level",
          lastestID: pageParams ? pageParams : "",
        }),
      {
        getNextPageParam: ({ nextCursor }: any) => {
          return nextCursor || undefined;
        },
        refetchOnWindowFocus: true
      }
    );
  const listAppMenu = [].concat(...(dataReturnFromAPIGetListAppMenu?.pages || []).map((d: any) => d.data?.listRecords));

  return {
    isLoadingGetListAppMenu,
    refetchGetListAppMenu,
    listAppMenu,
    nextPageGetListAppMenu
  }
};

// 4. Lấy danh sách MENU được quyền truy cập của 1 user
export const useGetListAppRoleMenu = (appID: string, type:  "1" | "2" | "3"): any => {
  const currentUser = localStorage.getItem("currentUser") ?? "{}";
  const profile = JSON.parse(currentUser);
  const {
    isLoading: isLoadingGetListAppRoleMenu,
    refetch: refetchGetListAppRoleMenu,
    data: dataReturnFromAPIGetListAppRoleMenu,
    fetchNextPage: nextPageGetListAppRoleMenu
  } =
    useInfiniteQuery(
      `app_role_menus/permission?appID=${appID}$type=${type}`,
      async ({ pageParams }: any) =>
        AuthenticationRepository.getListAppRoleMenu({
          appID: appID,
          companyID: profile?.company?._id,
          type
        }),
      {
        getNextPageParam: ({ nextCursor }: any) => {
          return nextCursor || undefined;
        },
        refetchOnWindowFocus: true
      }
    );
  const listAppRoleMenu = [].concat(...(dataReturnFromAPIGetListAppRoleMenu?.pages || []).map((d: any) => d.data));

  return {
    isLoadingGetListAppRoleMenu,
    refetchGetListAppRoleMenu,
    listAppRoleMenu,
    nextPageGetListAppRoleMenu
  }
};

// 5. Check quyền truy cập vào một menu trong app
export const useCheckPerAccessOneMenu = (appID: string, menuID: string, type: "1" | "2" | "3"): UseCheckPermissionOneMenu => {
  const currentUser = localStorage.getItem("currentUser") ?? "{}";
  const profile = JSON.parse(currentUser);
  const { isSuccess, data } =
    useQuery(`permission-to-access-one-menu-of-app?appID=${appID}&menuID={${menuID}}`, () => AuthenticationRepository.checkPermissionsAccessOneMenu({
      appID: appID,
      menuID: menuID,
      companyID: profile?.company?._id,
      type: type
    }), {
      refetchOnWindowFocus: true
    });
  console.log("permission-to-access-one-menu-of-app", data);
  let hasPermission = true;
  if (isSuccess && data?.data?.keyError == 'permission_denied') {
    hasPermission = false;
  }

  return {
    hasPermission,
    isSuccess,
    permission: data?.data || {
      create: 0,
      update: 0,
      delete: 0,
      read: 0
    }
  };
};
