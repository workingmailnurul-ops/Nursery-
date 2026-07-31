import React from 'react';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 whitespace-nowrap cursor-pointer';

  const variantStyles = {
    primary: 'bg-[#2F5233] text-white hover:bg-[#244128] focus:ring-[#2F5233] shadow-xs',
    accent: 'bg-[#E8862E] text-white hover:bg-[#CF7322] focus:ring-[#E8862E] shadow-xs font-semibold',
    secondary: 'bg-[#FAF7F2] text-[#2F5233] border border-[#2F5233]/20 hover:bg-[#F2EBE1] focus:ring-[#2F5233]',
    outline: 'border-2 border-[#2F5233] text-[#2F5233] hover:bg-[#2F5233] hover:text-white focus:ring-[#2F5233]',
    ghost: 'text-[#2F5233] hover:bg-[#2F5233]/10 focus:ring-[#2F5233]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[36px]',
    md: 'text-sm px-4 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-6 py-3.5 gap-2.5 min-h-[52px]',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
