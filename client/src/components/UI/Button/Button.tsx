import { MouseEvent, RefObject } from 'react';

interface ButtonProps {
  className?: string;
  children: React.ReactNode | string;
  onClick: (e: MouseEvent) => void;
  disabled?: boolean;
  ref?: RefObject<HTMLButtonElement>;
}

const Button = ({ className, children, onClick, disabled, ref }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled} ref={ref}>
      {children}
    </button>
  );
};

export default Button;
