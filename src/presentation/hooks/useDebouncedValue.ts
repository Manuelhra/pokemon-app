import { useEffect, useState } from 'react';

export const useDebouncedValue = (input: string, ms: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(input);
    }, ms);

    return () => {
      clearTimeout(handler);
    };
  }, [input, ms]);

  return [debouncedValue];
};
