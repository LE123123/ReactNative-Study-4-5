/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useCallback} from 'react';

export const useToggle = (
  initialValue: boolean = false,
  deps: any[] = [],
): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);
  const toggleValue: () => void = useCallback(
    () => setValue(prevValue => !prevValue),
    deps,
  );
  return [value, toggleValue];
};
