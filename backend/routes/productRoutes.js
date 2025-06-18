// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Adding product
router.post('/add', (req, res) => {
  const { category, product_name, product_img, product_description, prize, orders_count } = req.body;

  const sql = `INSERT INTO products 
    (category, product_name, product_img, product_description, prize, orders_count)
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [category, product_name, product_img, product_description, prize, orders_count], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json({ success: true, message: 'Product added successfully' });
  });
});

// Get all products
router.get('/all', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });
    res.json({ success: true, products: results });
  });
});

module.exports = router;
