import API from "../repository";

import {
  SignInPayload,
  SignInResponse,
  UserInfoResponse,
  UpdateDevicePayload,
  GetListAppOfUserResponse,
  PermissionAccessAppResponse,
  PermissionAccessOneMenuPayload,
  PermissionAccessOneMenuResponse
} from "typings/auth";

const authURL = "/api/auth";
const HISTORY_TRAFFICS = "/api/analysis/history_traffics";

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
      `${authURL}/users/me`
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

  // 1. Lấy danh sách ứng dụng của 1 user được truy cập
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

  // 2. Check quyền truy cập vào 1 app tổng
  async checkPermissionsAccessApp(appID: string): Promise<PermissionAccessAppResponse> {
    const { data } = await API.get<PermissionAccessAppResponse>(
      `${authURL}/app_users/check-permissions-access-app?appID=${appID}`);
    return data;
  },

  // 3. Lấy danh sách MENU của hệ thống
  async getListAppMenu(payload: any): Promise<any> {
    const { data } = await API.get<any>(
      `${authURL}/app_menus`, {
      params: {
        ...payload
      }
    });
    return data;
  },

  // 4. Lấy danh sách MENU được quyền truy cập của 1 user
  async getListAppRoleMenu(payload: any): Promise<any> {
    const { data } = await API.get<any>(
      `${authURL}/app_role_menus/permission`, {
      params: {
        ...payload
      }
    });
    return data;
  },

  // 5. Check quyền truy cập vào một menu trong app
  async checkPermissionsAccessOneMenu(payload: PermissionAccessOneMenuPayload): Promise<PermissionAccessOneMenuResponse> {
    const { data } = await API.get<PermissionAccessOneMenuResponse>(
      `${authURL}/app_role_menus/permission-to-access-one-menu-of-app`, {
      params: {
        ...payload
      }
    });
    return data;
  },

  // APP_ROLE - GET LIST
  async getListAppRole(payload: any): Promise<any> {
    const { data } = await API.get<any>(
      `${authURL}/app_roles`, {
      params: {
        ...payload
      }
    });
    return data;
  },

  // APP_ROLE - CREATE
  async createAppRole(payload: any): Promise<any> {
    const { data } = await API.post<any>(
      `${authURL}/app_roles`, payload);
    return data;
  },

  // APP_ROLE - UPDATE
  async updateAppRole(payload: any): Promise<any> {
    const { data } = await API.put<any>(
      `${authURL}/app_roles`, payload);
    return data;
  },

  // APP_ROLE - UPDATE
  async removeManyAppRole(payload: any): Promise<any> {
    const { data } = await API.delete<any>(
      `${authURL}/app_roles/remove-many`, {
      params: payload
    });
    return data;
  },

  // ADMIN DETAIL
  // GET INFO
  async getInfoAppRole(payload: any): Promise<any> {
    const { data } = await API.get<any>(
      `${authURL}/app_roles`, {
      params: {
        ...payload
      }
    });
    return data;
  },

  // DANH SÁCH THÀNH VIÊN TRONG CÔNG TY
  async getListUsersByCompany(payload: any): Promise<any> {
    const { data } = await API.get<any>(
      `${authURL}/users`, {
      params: {
        ...payload
      }
    });
    return data;
  },

  // DANH SÁCH QUYỀN MỘT THÀNH VIÊN ĐƯỢC TRUY CẬP
  async getListAppRoleMenuFromAdmin(payload: any): Promise<any> {
    const { data } = await API.get<any>(
      `${authURL}/app_role_menus`, {
      params: {
        ...payload
      }
    });
    return data;
  },

  // CẬP NHẬT QUYỀN TRUY CẬP MỘT CHỨC NĂNG CỦA NHÓM CHỨC NĂNG
  async updatePermissionsAppRoleMenus(payload: any): Promise<any> {
    const { data } = await API.post<any>(
      `${authURL}/app_role_menus`, payload);
    return data;
  },

  async requestHistoryTraffics(parame: any): Promise<any> {
    const { data } = await API.post(
        `${HISTORY_TRAFFICS}`,
        parame
    )
    return data;
  }
};

export default AuthenticationRepository;
