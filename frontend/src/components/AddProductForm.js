//frontend/src/components/AddProductForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

function AddProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    category: '',
    product_name: '',
    product_img: '',
    product_description: '',
    prize: '',
    orders_count: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/products/add', formData);
      alert('Product added successfully!');
      setFormData({
        category: '',
        product_name: '',
        product_img: '',
        product_description: '',
        prize: '',
        orders_count: 0,
      });
      onProductAdded(); // Notify parent to refresh product list
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Failed to add product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <br />
      <input type="text" name="product_name" value={formData.product_name} onChange={handleChange} placeholder="Product Name" required />
      <br />
      <input type="text" name="product_img" value={formData.product_img} onChange={handleChange} placeholder="Image URL" required />
      <br />
      <textarea name="product_description" value={formData.product_description} onChange={handleChange} placeholder="Description" required />
      <br />
      <input type="number" name="prize" value={formData.prize} onChange={handleChange} placeholder="Price" required />
      <br />
      <input type="number" name="orders_count" value={formData.orders_count} onChange={handleChange} placeholder="Orders Count" />
      <br />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
