import classNames from "classnames";
import React, { useContext, useEffect, useMemo, useRef } from "react";
import AutocompleteContext from "./AutocompleteContext";
import AutocompleteItem, { ItemProps } from "./AutocompleteItem";

import styles from "./Autocomplete.module.css";

type OnSelectedChange<T> = (item: T | T[]) => void;

type Props<T extends ItemProps> = {
  items: ItemProps[];
  selectedItemIds: Array<string | number>;
  selectionVariant?: "single" | "multiple";
  onSelectedChange?: OnSelectedChange<T>;
};
function getdefaultCheckedSelectionChange<T extends ItemProps>(
  setInputValueFn: (value: string) => void
): OnSelectedChange<T> {
  return function (itemOrItems) {
    const { text = "" } = Array.isArray(itemOrItems) ? itemOrItems.slice(-1)[0] : itemOrItems;
    setInputValueFn(text);
  };
}

function getItemById<T extends ItemProps>(itemId: string | number | undefined, items: T[]) {
  return items.find((item) => item.id === itemId);
}

function AutocompleteMenu<T extends ItemProps>(props: Props<T>): JSX.Element {
  const { items, selectedItemIds, selectionVariant, onSelectedChange } = props;
  const autocompleteContext = useContext(AutocompleteContext);
  if (autocompleteContext === null) {
    throw new Error("AutocompleteContext returned null values");
  }

  const { setShowMenu, setInputValue, showMenu, setAutocompleteSuggestion, inputRef } =
    autocompleteContext;
  const listContainerRef = useRef<HTMLDivElement>(null);

  const itemsToRender = useMemo(() => {
    return items.map((item) => {
      return {
        ...item,
        key: item.id,
        selected:
          selectionVariant === "multiple"
            ? selectedItemIds.includes(item.id as string | number)
            : undefined,
        onAction: (item: T, e: any) => {
          const otherSelectedItemIds = selectedItemIds.filter(
            (selectedItemId) => selectedItemId !== item.id
          );

          const newSelectedItemIds = selectedItemIds.includes(item.id as string)
            ? otherSelectedItemIds
            : [...otherSelectedItemIds, item.id];

          const onSelectedChangeFn = onSelectedChange
            ? onSelectedChange
            : getdefaultCheckedSelectionChange(setInputValue);

          onSelectedChangeFn(
            newSelectedItemIds.map((newSelectedItemId) =>
              getItemById(newSelectedItemId, items)
            ) as T[]
          );

          if (selectionVariant === "multiple") {
            setInputValue("");
            setAutocompleteSuggestion("");
          } else {
            setShowMenu(false);
            // inputRef.current?.setSelectionRange(
            //   inputRef.current.value.length,
            //   inputRef.current.value.length
            // );
          }
        },
      };
    });
  }, [selectedItemIds, items]);

  useEffect(() => {
    if (listContainerRef.current && inputRef.current) {
      listContainerRef.current.addEventListener("focusin", (event) => {
        inputRef.current?.focus();
      });
    }
  }, []);

  return (
    <div className="relative z-1">
      <div className={classNames(!showMenu ? styles.visualHidden : "absolute", "bg-cbs-secondary")}>
        <div ref={listContainerRef}>
          {itemsToRender.map((item: any, index) => {
            return <AutocompleteItem {...item} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default AutocompleteMenu;
