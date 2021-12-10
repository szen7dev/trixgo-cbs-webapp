import API from "../repository";

import {
  SIGN_IN_API_URL,
} from "utils/constants";

import { SignInPayload, SignInResponse } from "typings/auth";

const authURL = "/api/auth";

const AuthenticationRepository = {
  async signIn(payload: SignInPayload): Promise<SignInResponse> {
    const { data } = await API.post<SignInResponse>(
      `${authURL}${SIGN_IN_API_URL}`,
      payload
    );
    return data;
  },
};

export default AuthenticationRepository;
