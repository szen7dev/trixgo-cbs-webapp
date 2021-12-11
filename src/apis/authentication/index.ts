import API from "../repository";

import { SignInPayload, SignInResponse } from "typings/auth";

const authURL = "/api/auth";

const AuthenticationRepository = {
  async signIn(payload: SignInPayload): Promise<SignInResponse> {
    const { data } = await API.post<SignInResponse>(
      `${authURL}/users/login`,
      payload
    );
    return data;
  },

  async usersInfo(): Promise<SignInResponse> {
    const { data } = await API.post<SignInResponse>(
      `${authURL}users/me`
    );
    return data;
  },
};

export default AuthenticationRepository;
