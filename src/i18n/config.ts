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

import authenticationJA from "./ja/authentication";
import pcmJA from './ja/pcm';
import humanJA from './ja/human';
import documentJA from './ja/document';

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
  ja: {
    ...authenticationJA,
    ...pcmJA,
    human: humanJA,
    document: documentJA
  },
} as const;

const currentLang = localStorage.getItem('user_language');

i18n.use(initReactI18next).init({
  lng: currentLang || "vn",
  ns: ["signIn", "register", "resetPassword", "human"],
  resources,
})