//frontend/src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/style.css'; 

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/">Home</Link>
        {user?.role === "admin" && (
          <Link to="/admin/add-product">Add Product</Link>
        )}
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};


export default Navbar;
