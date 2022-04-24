import React, { HTMLAttributes } from "react";

type TextInputProps = {
  disabled?: boolean;
} & React.ComponentPropsWithoutRef<"input">;

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, disabled, ...props }, inputRef) => {
    return (
      <div>
        <input
          ref={inputRef}
          id={id}
          disabled={disabled}
          // onFocus={handleInputFocus}
          // onBlur={handleInputBlur}
          // value={inputValue}
          // onFocus={handleInputFocus}
          // onBlur={handleInputBlur}
          // onChange={handleInputChange}
          // onKeyDown={handleInputKeyDown}
          // onKeyPress={onInputKeyPress}
          // onKeyUp={handleInputKeyUp}
          {...props}
        />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
