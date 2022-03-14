import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import authenticationVN from "./vn/authentication";
import pcmVN from './vn/pcm';
import humanVN from './vn/human';
import documentVN from './vn/document';

import authenticationEN from "./en/authentication";
import pcmEN from './en/pcm';
import humanEN from './en/human';
import documentEN from './en/document';

export const resources = {
  en: {
    ...authenticationEN,
    ...pcmEN,
    human: humanEN,
    document: documentEN
  },
  vn: {
    ...authenticationVN,
    ...pcmVN,
    human: humanVN,
    document: documentVN
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "vn",
  ns: ["signIn", "register", "resetPassword", "human"],
  resources,
});
