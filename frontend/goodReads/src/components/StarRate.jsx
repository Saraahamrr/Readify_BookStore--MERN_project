import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from "@fortawesome/free-solid-svg-icons";

export default function StarRating({ rating }) {
  const fullStars = Math.floor(rating); 
  const halfStar = rating % 1 !== 0; 
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
