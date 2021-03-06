import { MouseEvent, RefObject } from 'react';

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick: (e: MouseEvent) => void;
  disabled?: boolean;
  ref?: RefObject<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({ className, children, onClick, disabled, ref, type }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled} ref={ref} type={type}>
      {children}
    </button>
  );
};
