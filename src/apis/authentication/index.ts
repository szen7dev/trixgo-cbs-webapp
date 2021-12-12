import API from "../repository";

import { SignInPayload, SignInResponse, UserInfoResponse } from "typings/auth";

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
};

export default AuthenticationRepository;
