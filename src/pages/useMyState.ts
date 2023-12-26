import React, { useState, useCallback } from 'react';

const useMyState = <T>(initialValue: T): [T, (newValue: T) => void] => {
  const [value, setValue] = useState<T>(initialValue);
  const [trigger, setTrigger] = useState<number>(0);

  // Function to update state and trigger re-render
  const setState = useCallback((newValue: T) => {
    setValue(newValue);
    setTrigger(t => t + 1); // update trigger to force re-render
  }, []);

  return [value, setState];
};