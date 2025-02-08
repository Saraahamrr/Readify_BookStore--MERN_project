import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from "@fortawesome/free-solid-svg-icons";

export default function StarRating({ rating }) {
  const validRating = Math.min(5, Math.max(0, rating || 0)); // تأكد أن التقييم رقم صحيح بين 0 و 5
  const fullStars = Math.floor(validRating);
  const halfStar = validRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon key={i} icon={faStar} className="text-warning" />
      ))}
      {halfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-warning" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon key={i + fullStars} icon={faStarEmpty} className="text-muted" />
      ))}
    </div>
  );
}
