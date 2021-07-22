import API from "../repository";

import {
  REGISTER_API_URL,
  VERIFY_EMAIL_API_URL,
  SIGN_IN_API_URL,
} from "utils/constants";

import {
  RegisterPayload,
  RegisterResponse,
  VerifyEmailPayload,
  verifyEmailResponse,
  SignInPayload,
  SignInResponse,
} from "typings/auth";

const authURL = "/auth";

const AuthenticationRepository = {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const { data } = await API.post<RegisterResponse>(
      `${authURL}${REGISTER_API_URL}`,
      payload
    );

    return data;
  },
  async verifyEmail(payload: VerifyEmailPayload): Promise<verifyEmailResponse> {
    const { data } = await API.post<verifyEmailResponse>(
      `${authURL}${VERIFY_EMAIL_API_URL}`,
      payload
    );

    return data;
  },
  async signIn(payload: SignInPayload): Promise<SignInResponse> {
    const { data } = await API.post<SignInResponse>(
      `${authURL}${SIGN_IN_API_URL}`,
      payload
    );

    return data;
  },
};

export default AuthenticationRepository;
