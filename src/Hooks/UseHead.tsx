import { useEffect, useState } from 'react';

export const useHead = () => {
  const [staticTitle, setStaticTitle] = useState('');

  useEffect(() => {
    document.title = staticTitle + ' | Dogs';
  }, [staticTitle]);

  return {
    staticTitle,
    setStaticTitle,
  };
};
