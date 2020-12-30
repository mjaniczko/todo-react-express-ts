import { MouseEvent, RefObject } from 'react';

interface ButtonProps {
  className?: string;
  children: React.ReactNode | string;
  onClick: (e: MouseEvent) => void;
  disabled?: boolean;
  ref?: RefObject<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({ className, children, onClick, disabled, ref, type }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled} ref={ref} type={type}>
      {children}
    </button>
  );
};

export default Button;
