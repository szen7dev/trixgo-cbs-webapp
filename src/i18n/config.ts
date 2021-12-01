import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import signInEN from "./en/sign-in.json";
import signInVN from "./vn/sign-in.json";
import registerEN from "./en/register.json";
import registerVN from "./vn/register.json";
import forgotPasswordEN from "./en/forgot-password.json";
import forgotPasswordVN from "./vn/forgot-password.json";

export const resources = {
  en: {
    signIn: signInEN,
    register: registerEN,
    forgotPassword: forgotPasswordEN,
  },
  vn: {
    signIn: signInVN,
    register: registerVN,
    forgotPassword: forgotPasswordVN,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["signIn", "register", "forgotPassword"],
  resources,
});
