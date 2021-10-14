import { useState } from 'react';

export const useInput = (initialValue?: string, validator?: (value: string) => boolean) => {
  const [value, setValue] = useState<string | undefined>(initialValue);
  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  return {
    value,
    isValid,
    isDirty,
    bind: {
      value,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsValid(validator ? validator(event.target.value) : true);
        setValue(event.target.value);
        setIsDirty(true);
      },
    },
  };
};
