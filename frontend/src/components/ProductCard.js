//frontend/src/components/ProductCard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductCard({ product, user, onReviewClick, onDeleteReview }) {
  const [reviews, setReviews] = useState([]);
  const [userReviewed, setUserReviewed] = useState(false);
  const [userReviewId, setUserReviewId] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${product.product_id}`);
        if (res.data.success) {
          setReviews(res.data.reviews);

          if (user?.user_id) {
  const found = res.data.reviews.find(r => r.user_id === user.user_id);
  if (found) {
    setUserReviewed(true);
    setUserReviewId(found.rating_review_id);
  } else {
    setUserReviewed(false);
    setUserReviewId(null);
  }
}

        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, [product.product_id, user.user_id]);

  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <img src={product.product_img} alt={product.product_name} width="150" />
      <h3>{product.product_name}</h3>
      <p>{product.product_description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ₹{product.prize}</p>

      {user.role === 'admin' ? (
        <p><i>Visible to Admin only</i></p>
      ) : (
        <>
          {userReviewed ? (
            <button onClick={() => onDeleteReview(userReviewId)}>Delete Review</button>
          ) : (
            <button onClick={() => onReviewClick(product)}>Give Rating & Review</button>
          )}
        </>
      )}

      {/* Reviews */}
      <div style={{ marginTop: '15px' }}>
        <h4>Reviews given till now:</h4>
        {reviews.length > 0 ? (
          reviews.map(r => (
            <div key={r.rating_review_id} style={{ borderTop: '1px solid #eee', paddingTop: '5px' }}>
              <p><strong>User:</strong> {r.username || 'Anonymous'}</p>
              {r.rating && <p><strong>Rating:</strong> {r.rating}/5</p>}
              {r.review && <p><strong>Review:</strong> {r.review}</p>}
              {r.img && <img src={r.img} alt="Review" width="100" />}
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
