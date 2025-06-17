//frontend/src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import AddProductForm from './AddProductForm';
import ProductList from './ProductList';
import axios from 'axios';
import '../styles/style.css';


function AdminDashboard({ user }) {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

  const handleProductAdded = () => {
    setRefresh(prev => !prev); // trigger refresh of product list
  };

  return (
   <div className="page-container">
  <h2 className="page-heading">Welcome Admin - {user?.username || 'Admin'}</h2>
  <hr />
  <h3>Add New Product</h3>
  <AddProductForm onProductAdded={handleProductAdded} />
  <hr />
  <h3>All Products</h3>
  <ProductList products={products} isAdmin={true} user={user} />
</div>

  );
}


export default AdminDashboard;
