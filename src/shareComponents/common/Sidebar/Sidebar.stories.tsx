// Sidebar.stories.ts|tsx
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { ComponentMeta } from "@storybook/react";

import SidebarTreeViewList from "./SidebarTreeViewList";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/Sidebar",
  decorators: [
    (Story) => (
      <div className="max-w-sm shadow-md">
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </div>
    ),
  ],
  // Sets the layout parameter component wide.
  parameters: {
    layout: "full",
  }, // component: SidebarTreeViewList,
} as ComponentMeta<typeof SidebarTreeViewList>;

const list = [
  {
    path: "/workshop/home",
    label: "Trang chủ workshop",
  },
  {
    path: "/workshop/list",
    label: "Workshop yêu thích",
    isGroup: true,
    children: [
      { path: "/workshop/list/category/1", label: "Workshop 1" },
      { path: "/workshop/list/category/2", label: "Workshop 1" },
    ],
  },
  {
    path: "/workshop/list",
    label: "Workshop yêu thích",
    isGroup: true,
    children: [
      { path: "/workshop/list/category/1", label: "Workshop 1" },
      { path: "/workshop/list/category/2", label: "Workshop 1" },
    ],
  },
];

export const SidebarList = (): JSX.Element => <SidebarTreeViewList list={list} className="pl-6 pr-2 text-large text-cbs-subtext" />;
