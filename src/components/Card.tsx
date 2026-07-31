import React from 'react';
import { CardProps } from '../types';

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl border border-[#2F5233]/10 overflow-hidden
        ${hoverEffect ? 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#2F5233]/25' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
