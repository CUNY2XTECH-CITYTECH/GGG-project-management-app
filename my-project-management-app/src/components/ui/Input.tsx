import { InputHTMLAttributes } from 'react';

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      {...props}
    />
  );
};

export default Input;
