import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  showReviews?: boolean;
}

export function StarRating({ rating, reviewCount, showReviews = true }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(rating);
    const partial = i === Math.floor(rating) && rating % 1 !== 0;
    
    return (
      <Star
        key={i}
        className={`text-sm ${
          filled ? "text-accent fill-current" : 
          partial ? "text-accent fill-current opacity-50" : 
          "text-slate-300"
        }`}
      />
    );
  });

  return (
    <div className="flex items-center space-x-1">
      <div className="flex">{stars}</div>
      <span className="text-sm font-medium text-slate-700 ml-2">{rating}</span>
      {showReviews && reviewCount && (
        <>
          <span className="text-sm text-slate-500">·</span>
          <span className="text-sm text-slate-500">{reviewCount} reviews</span>
        </>
      )}
    </div>
  );
}
