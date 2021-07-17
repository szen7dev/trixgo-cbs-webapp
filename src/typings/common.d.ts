import { ReactNode } from "react";

export type Locale = {
  id: string;
  code: string;
  name: string;
  flag: ReactNode;
  grayFlag: ReactNode;
};

export type NavLink = {
  id: string;
  label: string;
  url: string;
  pathname: string;
  icon: ReactNode;
};

export type TaskManagementNavLink = {
  title: string;
  navLink: NavLink[];
};
