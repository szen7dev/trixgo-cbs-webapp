import { useState, useEffect } from 'react';

interface InputState {
  [key: string]: any;
}

export const useInputChange = (defaultValue = {}) => {
  const [inputValues, setInputValues] = useState<InputState>(defaultValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  useEffect(() => {
    return () => {
      setInputValues(defaultValue);
    };
  }, []);

  return {
    inputValues,
    handleInputChange,
    setInputValues,
  };
};
