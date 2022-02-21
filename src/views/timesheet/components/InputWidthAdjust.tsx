import React, { FC, useEffect, useState } from "react";

type Props = {
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputWidthAdjust: FC<Props> = ({ className, value, onChange }) => {
  const [valueHeading, setValueHeading] = useState(value ?? "");
  const [isInitialValue, toggleInitialValue] = useState(false);
  const [headingWidthInput, setHeadingWidthInput] = useState(0);

  useEffect(() => {
    setHeadingWidthInput((valueHeading.length + 4) * 8);
  }, [valueHeading]);

  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueHeading(event.target.value);
    onChange && onChange(event);
  };

  React.useLayoutEffect(() => {
    if (value && !isInitialValue) {
      toggleInitialValue(true);
      setValueHeading(value);
    }
  }, [isInitialValue, value]);

  return (
    <input
      style={{ width: headingWidthInput }}
      onChange={(event) => setValue(event)}
      value={valueHeading}
      className={className}
    />
  );
};

export default InputWidthAdjust;
