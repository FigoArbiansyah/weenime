import React from "react";

interface ButtonProps {
  children: any;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-block py-2 px-5 rounded bg-rose-500 text-white hover:text-rose-500 border border-rose-500 hover:bg-transparent transition-all ease duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
