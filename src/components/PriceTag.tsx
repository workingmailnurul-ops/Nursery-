import React from 'react';
import { PriceTagProps } from '../types';
import { Badge } from './Badge';

export const PriceTag: React.FC<PriceTagProps> = ({
  price,
  originalPrice,
  currency = '₹',
  size = 'md',
  showSavings = true,
  className = '',
}) => {
  const hasDiscount = originalPrice !== undefined && originalPrice > price;
  const savingsPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const sizeClasses = {
    sm: {
      current: 'text-base font-bold text-[#2F5233]',
      original: 'text-xs text-stone-400 line-through',
    },
    md: {
      current: 'text-xl font-bold text-[#2F5233]',
      original: 'text-sm text-stone-400 line-through',
    },
    lg: {
      current: 'text-2xl sm:text-3xl font-extrabold text-[#2F5233]',
      original: 'text-base text-stone-400 line-through',
    },
  };

  return (
    <div className={`inline-flex items-center gap-2 flex-wrap ${className}`}>
      <span className={sizeClasses[size].current}>
        {currency}{price.toLocaleString()}
      </span>
      {hasDiscount && (
        <>
          <span className={sizeClasses[size].original}>
            {currency}{originalPrice.toLocaleString()}
          </span>
          {showSavings && savingsPercent > 0 && (
            <Badge variant="discount" size={size === 'lg' ? 'md' : 'sm'}>
              Save {savingsPercent}%
            </Badge>
          )}
        </>
      )}
    </div>
  );
};
