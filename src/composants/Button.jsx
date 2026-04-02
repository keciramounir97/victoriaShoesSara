import React from 'react';

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:pointer-events-none disabled:opacity-50 rounded-lg';
  
  const variants = {
    default: 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm hover:shadow',
    outline: 'border-2 border-rose-200 bg-transparent hover:bg-rose-50 hover:border-rose-300',
    ghost: 'hover:bg-rose-50 hover:text-rose-500',
    link: 'text-rose-500 hover:text-rose-600 underline-offset-4 hover:underline',
  };
  
  const sizes = {
    default: 'h-10 px-4 py-2 text-sm',
    sm: 'h-8 px-3 text-xs',
    lg: 'h-12 px-8 text-base',
    icon: 'h-10 w-10 p-0',
  };
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;