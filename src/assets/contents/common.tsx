import { NavLink, TaskManagementNavLink } from "typings/common";

import DashboardNavIcon from "assets/icons/DashboardNav";
import SwitchVerticalIcon from "assets/icons/SwitchVertical";
import CubeIcon from "assets/icons/Cube";
import SparklesIcon from "assets/icons/Sparkles";
import UserGroupIcon from "assets/icons/UserGroup";
import ChatIcon from "assets/icons/Chat";
import ClipboardCheckIcon from "assets/icons/ClipboardCheck";
import ApplicationsIcon from "assets/icons/Applications";
import SettingsIcon from "assets/icons/Settings";

export const NavLinks: NavLink[] = [
  {
    id: "nav-link-home",
    label: "Home",
    url: "/dashboard",
    pathname: "dashboard",
    icon: (
      <DashboardNavIcon
        pathname="dashboard"
        className="float-left h-6 w-6 mr-6"
      />
    ),
  },
  {
    id: "nav-link-customers",
    label: "Customers",
    url: "/customers",
    pathname: "customers",
    icon: (
      <SwitchVerticalIcon
        pathname="customers"
        className="float-left h-6 w-6 mr-6"
      />
    ),
  },
  {
    id: "nav-link-orders",
    label: "Orders",
    url: "/orders",
    pathname: "orders",
    icon: <CubeIcon pathname="orders" className="float-left h-6 w-6 mr-6" />,
  },
  {
    id: "nav-link-campaigns",
    label: "Campaigns",
    url: "/campaigns",
    pathname: "campaigns",
    icon: (
      <SparklesIcon pathname="campaigns" className="float-left h-6 w-6 mr-6" />
    ),
  },
  {
    id: "nav-link-team",
    label: "Team",
    url: "/team",
    pathname: "team",
    icon: <UserGroupIcon pathname="team" className="float-left h-6 w-6 mr-6" />,
  },
  {
    id: "nav-link-messages",
    label: "Messages",
    url: "/messages",
    pathname: "messages",
    icon: <ChatIcon pathname="messages" className="float-left h-6 w-6 mr-6" />,
  },
  {
    id: "nav-link-tasks",
    label: "Tasks",
    url: "/tasks",
    pathname: "tasks",
    icon: (
      <ClipboardCheckIcon
        pathname="tasks"
        className="float-left h-6 w-6 mr-6"
      />
    ),
  },
  {
    id: "nav-link-applications",
    label: "Applications",
    url: "/applications",
    pathname: "applications",
    icon: (
      <ApplicationsIcon
        pathname="applications"
        className="float-left h-6 w-6 mr-6"
      />
    ),
  },
  {
    id: "nav-link-settings",
    label: "Settings",
    url: "/settings",
    pathname: "settings",
    icon: (
      <SettingsIcon pathname="settings" className="float-left h-6 w-6 mr-6" />
    ),
  },
];

export const TaskManagementNavLinks: TaskManagementNavLink[] = [
  {
    title: "Quản trị",
    navLink: [
      {
        id: "nav-link-home",
        label: "Home",
        url: "/dashboard",
        pathname: "dashboard",
        icon: (
          <DashboardNavIcon pathname="dashboard" className="h-5 w-5 mr-3" />
        ),
      },
      {
        id: "nav-link-customers",
        label: "Customers",
        url: "/customers",
        pathname: "customers",
        icon: (
          <SwitchVerticalIcon pathname="customers" className="h-5 w-5 mr-3" />
        ),
      },
      {
        id: "nav-link-orders",
        label: "Orders",
        url: "/orders",
        pathname: "orders",
        icon: <CubeIcon pathname="orders" className="h-5 w-5 mr-3" />,
      },
      {
        id: "nav-link-campaigns",
        label: "Campaigns",
        url: "/campaigns",
        pathname: "campaigns",
        icon: <SparklesIcon pathname="campaigns" className="h-5 w-5 mr-3" />,
      },
    ],
  },
  {
    title: "Công việc",
    navLink: [
      {
        id: "nav-link-team",
        label: "Team",
        url: "/team",
        pathname: "team",
        icon: <UserGroupIcon pathname="team" className="h-5 w-5 mr-3" />,
      },
      {
        id: "nav-link-messages",
        label: "Messages",
        url: "/messages",
        pathname: "messages",
        icon: <ChatIcon pathname="messages" className="h-5 w-5 mr-3" />,
      },
      {
        id: "nav-link-tasks",
        label: "Tasks",
        url: "/tasks",
        pathname: "tasks",
        icon: <ClipboardCheckIcon pathname="tasks" className="h-5 w-5 mr-3" />,
      },
      {
        id: "nav-link-applications",
        label: "Applications",
        url: "/applications",
        pathname: "applications",
        icon: (
          <ApplicationsIcon pathname="applications" className="h-5 w-5 mr-3" />
        ),
      },
      {
        id: "nav-link-settings",
        label: "Settings",
        url: "/settings",
        pathname: "settings",
        icon: <SettingsIcon pathname="settings" className="h-5 w-5 mr-3" />,
      },
    ],
  },
];
