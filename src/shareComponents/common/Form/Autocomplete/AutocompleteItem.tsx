import React, {
  ForwardRefExoticComponent,
  HTMLAttributes,
  PropsWithoutRef,
  RefAttributes,
  useCallback,
} from "react";

export type ItemProps = {
  text?: string;
  description?: string;
  selected?: boolean;
  disabled?: boolean;
  id?: string | number;
  children?: React.ReactNode;
  /**
   * Callback that will trigger both on click selection and keyboard selection.
   */
  onAction?: (
    item: ItemProps,
    event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => void;
} & Exclude<HTMLAttributes<HTMLDivElement>, "id">;

const AutocompleteItem = React.forwardRef((itemProps, ref) => {
  const { id, selected, disabled, text, onClick, onAction, onKeyPress, ...props } = itemProps;

  const keyPressHandler = useCallback(
    (event) => {
      if (disabled) {
        return;
      }

      onKeyPress?.(event);

      if (!event.defaultPrevented && [" ", "Enter"].includes(event.key)) {
        onAction?.(itemProps, event);
      }
    },
    [onAction, disabled, itemProps, onKeyPress]
  );
  const clickHandler = useCallback(
    (event) => {
      if (disabled) {
        return;
      }
      onClick?.(event);
      if (!event.defaultPrevented) {
        onAction?.(itemProps, event);
      }
    },
    [onAction, disabled, itemProps, onClick]
  );

  return (
    <div
      className="flex"
      ref={ref}
      onClick={clickHandler}
      onKeyPress={keyPressHandler}
      tabIndex={-1}
      {...props}
    >
      <div>
        {selected ? "yes" : "no"}
        {/* <input
          className="cbs-checkbox"
          type="checkbox"
          id={String(id)}
          onChange={() => null}
          checked={selected}
          disabled={disabled}
        /> */}
      </div>
      <div className="flex-grow">
        <span>{text}</span>
      </div>
    </div>
  );
}) as ForwardRefExoticComponent<PropsWithoutRef<ItemProps> & RefAttributes<HTMLDivElement>>;
AutocompleteItem.displayName = "AutocompleteItem";

export default AutocompleteItem;
