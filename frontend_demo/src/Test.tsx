import React from 'react';

interface TestProps {
  message: string;
}

export const Test: React.FC<TestProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default Test;