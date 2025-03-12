import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive';
}

const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...props
}) => {
  const styles = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button className={`px-4 py-2 rounded ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
