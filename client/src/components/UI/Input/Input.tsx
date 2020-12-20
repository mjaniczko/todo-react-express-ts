import { RefObject, ChangeEvent } from 'react';

interface InputProps {
  name: string;
  value?: string;
  placeholder: string;
  ref?: RefObject<HTMLInputElement>;
  type: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className: string;
}

const Input = ({ name, value, placeholder, ref, type, error, onChange, className }: InputProps) => {
  return (
    <div>
      <input
        ref={ref}
        name={name}
        value={value}
        placeholder={placeholder}
        type={type}
        className={className}
        onChange={onChange}
      />
      <p>{error}</p>
    </div>
  );
};

export default Input;
