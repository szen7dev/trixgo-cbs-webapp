import React, { FC } from "react";

export interface TokenBaseProps
  extends Omit<
    React.HTMLProps<HTMLSpanElement | HTMLButtonElement | HTMLAnchorElement>,
    "size" | "id"
  > {
  as?: "button" | "a" | "span";
  /**
   * The function that gets called when a user clicks the remove button, or keys "Backspace" or "Delete" when focused on the token
   */
  onRemove?: () => void;
  /**
   * Whether the remove button should be rendered in the token
   */
  hideRemoveButton?: boolean;
  /**
   * Whether the token is selected
   */
  isSelected?: boolean;
  /**
   * The text label inside the token
   */
  text: string | undefined;
  /**
   * A unique identifier that can be associated with the token
   */
  id?: number | string;
  // /**
  //  * Which size the token will be rendered at
  //  */
  // size?: TokenSizeKeys;
}

interface TokenProps extends TokenBaseProps {
  //
  s?: string;
}

const Token: FC<TokenProps> = (props) => {
  return <div>Token</div>;
};

export default Token;
