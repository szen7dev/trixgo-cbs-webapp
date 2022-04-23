// Sidebar.stories.ts|tsx
import React from "react";

import { ComponentMeta } from "@storybook/react";

import Autocomplete from "./Autocomplete";
import { ItemProps } from "./AutocompleteItem";

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Form/Autocomplete",
  // Sets the layout parameter component wide.
  parameters: {
    // layout: "full",
  }, // component: Diagram,
} as ComponentMeta<typeof Autocomplete>;

const items: ItemProps[] = [
  {
    text: "123",
    id: "123",
  },
  {
    text: "hello",
    id: "1",
  },
];

export const Primary = (args: any): JSX.Element => {
  const [tokens, setTokens] = React.useState<ItemProps[]>([]); // [items[0], items[2]]
  const selectedTokenIds = tokens.map((token) => token.id as string);
  const [selectedItemIds, setSelectedItemIds] =
    React.useState<Array<string | number>>(selectedTokenIds);
  const onSelectedChange = (newlySelectedItems: ItemProps | ItemProps[]) => {
    if (!Array.isArray(newlySelectedItems)) {
      return;
    }

    setSelectedItemIds(newlySelectedItems.map((item) => item.id as string));

    if (newlySelectedItems.length < selectedItemIds.length) {
      const newlySelectedItemIds = newlySelectedItems.map(({ id }) => id);
      const removedItemIds = selectedTokenIds.filter((id) => !newlySelectedItemIds.includes(id));

      for (const removedItemId of removedItemIds) {
        // onTokenRemove(removedItemId);
      }

      return;
    }

    setTokens(newlySelectedItems.map(({ id, text }) => ({ id, text })));
  };
  return (
    <Autocomplete>
      <Autocomplete.Input tokens={[]} className="border-cbs-subtext border-0.5 rounded-sm" />
      <Autocomplete.Menu
        items={items}
        selectedItemIds={selectedItemIds}
        selectionVariant="multiple"
        onSelectedChange={onSelectedChange}
      />
    </Autocomplete>
  );
};
