//frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProductForm';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ⏳ Wait before rendering routes

  useEffect(() => {
    // Check session on app load
    axios.get('http://localhost:5000/api/auth/session', { withCredentials: true })
      .then((res) => {
        if (res.data.loggedIn) {
          setUser(res.data.user); // Restore session user
        }
        setLoading(false); // ✅ Done checking
      })
      .catch((err) => {
        console.error('Session check failed:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>; // Don't show routes until session is checked

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={!user ? <Login onLogin={setUser} /> : <Navigate to={`/${user.role}`} />}
        />
        <Route
          path="/admin"
          element={user?.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/add-product"
          element={user?.role === 'admin' ? <AddProduct /> : <Navigate to="/" />}
        />
        <Route
          path="/user"
          element={user?.role === 'user' ? <UserDashboard user={user} /> : <Navigate to="/" />}
        />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;
