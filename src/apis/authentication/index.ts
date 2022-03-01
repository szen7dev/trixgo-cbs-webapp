import API from "../repository";

import { SignInPayload, SignInResponse, UserInfoResponse, UpdateDevicePayload, GetListAppOfUserResponse, PermissionAccessAppResponse } from "typings/auth";

const authURL = "/api/auth";

const AuthenticationRepository = {
  async signIn(payload: SignInPayload): Promise<SignInResponse> {
    const { data } = await API.post<SignInResponse>(
      `${authURL}/users/login`,
      payload
    );
    return data;
  },

  async usersInfo(): Promise<UserInfoResponse> {
    const { data } = await API.get<UserInfoResponse>(
      `${authURL}/users/me?select={"company": "", "department": ""}&filter={"conversationsPin": 0, "friends": 0, "recentlyFriends": 0, "devices": 0, "registrationID": 0}`
    );
    return data;
  },

  async updateDevice(payload: UpdateDevicePayload): Promise<UserInfoResponse> {
    // const token = localStorage.getItem("token") as string;
    // API.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    const { data } = await API.post<UserInfoResponse>(
      `${authURL}/users/update-device`,
      payload
    );
    return data;
  },

  // Permission - Phân quyền
  async getListAppOfUser({ lastestID }: { lastestID: string }): Promise<GetListAppOfUserResponse> {
    const { data } = await API.get<GetListAppOfUserResponse>(
      `${authURL}/app_users/list-app-of-user`,
      {
        params: {
          populates: JSON.stringify({
            path: "app",
            select: "name sign"
          }),
          select: "app",
          lastestID: lastestID,
          limit: 20
        },
      }
    );
    return data;
  },

  // Permission - Phân quyền
  async checkPermissionsAccessApp(appID: string): Promise<PermissionAccessAppResponse> {
    const { data } = await API.get<PermissionAccessAppResponse>(
      `${authURL}/app_users/check-permissions-access-app?appID=${appID}`);
    return data;
  },
};

export default AuthenticationRepository;
