import React from 'react';

type Props = {
  error: string | null;
};

const Error: React.FC<Props> = ({ error }) => {
  if (!error) return null;
  if (error == null) return null;
  return <p style={{ color: '#f31', margin: '1rem 0' }}>{error}</p>;
};

export default Error;
