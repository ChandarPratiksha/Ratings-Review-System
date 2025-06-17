//frontend/src/components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import ReviewModal from './ReviewModal';
import '../styles/style.css';


function UserDashboard({ user }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/all');
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleReviewClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    fetchProducts(); // refresh after submitting review
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete your review?')) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/reviews/delete/${reviewId}`);
        if (res.data.success) {
          alert('Review deleted successfully!');
          fetchProducts(); // refresh after deletion
        } else {
          alert(res.data.message);
        }
      } catch (err) {
        console.error('Delete error:', err);
        alert('Failed to delete review');
      }
    }
  };

  return (
    <div className="page-container">
  <h2 className="page-heading">Welcome {user.username}</h2>
  <hr />
  {products.map(product => (
    <div className="product-card" key={product.product_id}>
      <ProductCard
        product={product}
        user={user}
        onReviewClick={handleReviewClick}
        onDeleteReview={handleDeleteReview}
      />
    </div>
  ))}
  {selectedProduct && (
    <ReviewModal
      product={selectedProduct}
      onClose={closeModal}
      user={user}
    />
  )}
</div>

  );
}

export default UserDashboard;
