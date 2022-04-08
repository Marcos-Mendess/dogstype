import { useEffect } from 'react';

type HeadProps = {
  title: string;
  user?: string;
  description?: string;
};

const Head = ({ title }: HeadProps) => {
  useEffect(() => {
    document.title = title + ' | Dogs';
  }, [title]);
  return <></>;
};

export default Head;
