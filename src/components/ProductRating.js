import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import axios from "axios";

const ProductRating = ({ productSlug }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        // Зміни URL на 127.0.0.1:8000
        const response = await axios.get(`http://127.0.0.1:8000/api/router/products/${productSlug}/`);
        console.log(response.data);  // Логування відповіді
        setAverageRating(parseFloat(response.data.average_rating) || 0);
        setRatingCount(response.data.rating_count || 0);
      } catch (error) {
        console.error("Error fetching rating", error);
      }
    };
    
    
  
    if (productSlug) {
      fetchRating();
    }
  }, [productSlug]); // Додано правильну залежність
  

  return (
    <div>
      <div className="d-flex align-items-center">
        <ReactStars className="react-stars"
          count={5}
          value={averageRating}
          size={24}
          color2={"#ffd700"}
          edit={false}
        />
        <p className="mb-0 ms-2">({ratingCount})</p>
      </div>
    </div>
  );
};

export default ProductRating;
