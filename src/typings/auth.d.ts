import { APIResponse } from "./apis/response";

export type UseAuth = {
  isLoading: boolean;
  hasAuthenticated: boolean;
  user: User | null;
  token: string | null;
  signIn: (payload: SignInPayload) => void;
  signOut: () => void;
  dataUserInfo: any;
  refetchDataUserInfo: any;
  updateDevice: (_id: string) => void;
};

export type User = {
  _id: string;
  email: string;
  phone: string;
  fullname: string;
  company: {
    _id: string;
    name: string;
    sign: string;
    image: string;
  };
  department: {
    _id: string;
    name: string;
    sign: string;
  };
  signature: string;
  status: number;
  level: number;
  image: string;
  gender: number;
  lang: string;
  birthDay: string;
};

export type AuthState = {
  isLoading: boolean;
  token: string | null;
  user: User | null;
  hasAuthenticated: boolean;
};

export type SignInPayload = {
  email: string;
  password: string;
  platform: string;
  domain: string;
};

export type SignInResponse = APIResponse & {
  data: {
    user: User;
    token: string;
  };
};

export type RequestAPI = {
  type: "REQUEST_API";
};

export type RequestAPIComplete = {
  type: "REQUEST_API_COMPLETE";
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

export type AuthActions =
  | RequestAPI
  | RequestAPIComplete
  | SignInError
  | SetAuth
  | RemoveAuth;

export type UserInfoResponse = APIResponse & {
  data: User;
};

export type UpdateDevicePayload = {
  platform: string;
  deviceID: string;
  deviceName: string;
  registrationID: string;
  oneSignalID: string;
  userID?: string;
  env?: string;
};

export type GetListAppOfUserResponse = APIResponse & {
  data: {
    listRecords: Array<any>;
    totalRecord: number;
    totalPage?: number;
    nextCursor?: string;
  };
};

export type PermissionAccessAppResponse = APIResponse & {
  data: {
    message: string;
    keyError?: string;
  };
};

export type PermissionAccessOneMenuPayload = {
  appID: string;
  menuID: string;
  companyID: string;
  type: "1" | "2" | "3";
};

export type PermissionAccessOneMenuResponse = APIResponse & {
  data: {
    message?: string;
    keyError?: string;
    read: number;
    create: number;
    update: number;
    delete: number;
  };
};

export type UseGetListAppOfUser = {
  isLoadingAppUsers: boolean;
  refetchAppUsers: any;
  nextPageAppUsers: any;
  listAppOfUser: Array<{
    _id: string;
    app: {
      _id: string;
      name: string;
    };
  }>;
};

export type UseCheckPermission = {
  hasPermission: boolean;
  isSuccess: boolean;
  dataUserAccess?: any;
};

export type UseCheckPermissionOneMenu = {
  hasPermission: boolean;
  isSuccess: boolean;
  permission: {
    read: number;
    create: number;
    update: number;
    delete: number;
  };
};

export type UseGetListAppMenu = {
  isLoadingGetListAppMenu: boolean;
  refetchGetListAppMenu: any;
  listAppMenu: Array<any>;
  nextPageGetListAppMenu: any;
};

export type UseGetListAppRoleMenu = {
  isLoadingGetListAppRoleMenu: boolean;
  refetchGetListAppRoleMenu: any;
  listAppRoleMenu: Array<any>;
  nextPageGetListAppRoleMenu: any;
};

export type LinkUserPosition = {
  _id: string;
  name: string;
};

export type LinkUser = {
  _id: string;
  fullname: string;
  image: string;
  position: string | LinkUserPosition;
};

export type UserInCompanyContract = {
  _id: string;
  name: string;
  image: string;
  linkUser: string | LinkUser;
};
