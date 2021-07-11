import { Story, Meta } from "@storybook/react";

import { Page, PageProps } from "stories/Page";

import * as HeaderStories from "stories/Header.stories";

export default {
  title: "Example/Page",
  component: Page,
} as Meta;

const Template: Story<PageProps> = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
