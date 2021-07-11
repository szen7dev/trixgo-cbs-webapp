import USFlagIcon from "assets/icons/USFlag";
import VNFlagIcon from "assets/icons/VNFlag";
import VNFlagGrayIcon from "assets/icons/VNFlagGray";
import USFlagGrayIcon from "assets/icons/USFlagGray";

import { Locale } from "typings/common";

export const LOCALES: Locale[] = [
  {
    id: "en-locale",
    code: "en",
    name: "english",
    flag: <USFlagIcon className="w-8 h-8" />,
    grayFlag: <USFlagGrayIcon className="w-8 h-8" />,
  },
  {
    id: "vn-locale",
    code: "vn",
    name: "vietnamese",
    flag: <VNFlagIcon className="w-8 h-8" />,
    grayFlag: <VNFlagGrayIcon className="w-8 h-8" />,
  },
];
