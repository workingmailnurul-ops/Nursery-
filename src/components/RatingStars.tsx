import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { RatingStarsProps } from '../types';

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  showCount = true,
  count,
  className = '',
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.8;
  const emptyStars = Math.max(0, maxRating - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5 text-amber-500" aria-label={`Rating ${rating} out of ${maxRating}`}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} className="fill-amber-400 text-amber-400" />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star size={size} className="text-amber-200 fill-amber-100" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star size={size} className="fill-amber-400 text-amber-400" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-stone-300 fill-stone-100" />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-stone-600 font-medium ml-0.5">
          {rating.toFixed(1)} {count !== undefined && <span className="text-stone-400">({count})</span>}
        </span>
      )}
    </div>
  );
};
