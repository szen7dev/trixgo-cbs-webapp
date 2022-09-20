import React, { useState } from "react";

const useValueOrState = <T>(
  value?: T
): [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>] => {
  const [state, setState] = useState<T | undefined>(value);
  return [typeof value !== "undefined" ? value : state, setState];
};

export default useValueOrState;
