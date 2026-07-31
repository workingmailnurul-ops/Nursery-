import React from 'react';
import { BadgeProps } from '../types';

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'discount',
  size = 'md',
  className = '',
}) => {
  const variantStyles = {
    discount: 'bg-[#E8862E] text-white font-bold shadow-xs',
    primary: 'bg-[#2F5233] text-white font-semibold',
    success: 'bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold',
    warning: 'bg-amber-100 text-amber-800 border border-amber-200 font-semibold',
    neutral: 'bg-[#F2EBE1] text-[#2F5233] font-medium border border-[#2F5233]/15',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 rounded-md leading-snug',
    md: 'text-xs px-2.5 py-1 rounded-lg leading-snug tracking-wide',
  };

  return (
    <span className={`inline-flex items-center justify-center whitespace-nowrap ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
