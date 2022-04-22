// Sidebar.stories.ts|tsx
import React from "react";

import { ComponentMeta } from "@storybook/react";

import LocalView, { generateNode } from "./LocalView";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/Diagram",
  // Sets the layout parameter component wide.
  parameters: {
    layout: "full",
  }, // component: Diagram,
} as ComponentMeta<typeof LocalView>;

const node = generateNode(5);

export const Primary = (args: any): JSX.Element => <LocalView node={node} {...args} />;

Primary.args = {
  defaultExpand: true,
};
