//frontend/src/components/ReviewModal.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/style.css';


function ReviewModal({ product, onClose, user }) {
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [img, setImg] = useState('');
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating && !review) {
      alert('Please provide either rating or review or both.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/reviews/submit', {
        product_id: product.product_id,
        user_id: user.user_id,
        rating,
        review,
        img,
      });

      if (res.data.success) {
        alert('Review submitted!');
        onClose();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Something went wrong.');
    }
  };

  return (
    <div className="review-modal">
  <h3>Review for {product.product_name}</h3>
  <form onSubmit={handleSubmit}>
    <label>Rating (1-5):</label><br />
    <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} /><br />

    <label>Review:</label><br />
    <textarea value={review} onChange={(e) => setReview(e.target.value)} /><br />

    <label>Image URL (optional):</label><br />
    <input type="text" value={img} onChange={(e) => setImg(e.target.value)} /><br />

    <button type="submit">Submit</button>
    <button type="button" onClick={onClose}>Cancel</button>
  </form>
</div>

  );
}


export default ReviewModal;
