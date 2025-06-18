// backend/routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Submit rating and review
router.post('/submit', (req, res) => {
  const { product_id, user_id, rating, review, img } = req.body;

  console.log('Received Review Submit:', { product_id, user_id, rating, review });

  const checkQuery = `SELECT * FROM rating_review WHERE product_id = ? AND user_id = ?`;

  db.query(checkQuery, [product_id, user_id], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });

    console.log('Existing reviews for this product & user:', rows);

    if (rows.length > 0) {
      return res.status(400).json({ success: false, message: 'You have already rated this product.' });
    }

    const insertQuery = `
      INSERT INTO rating_review (product_id, user_id, rating, review, img)
      VALUES (?, ?, ?, ?, ?)`;

    db.query(insertQuery, [product_id, user_id, rating, review, img], (err2, result) => {
      if (err2) return res.status(500).json({ success: false, message: 'Error saving review' });

      res.json({ success: true, message: 'Review submitted successfully' });
    });
  });
});


// Get all reviews for a product
router.get('/:productId', (req, res) => {
  const productId = req.params.productId;

  const sql = `SELECT rr.*, u.username FROM rating_review rr 
               JOIN users u ON rr.user_id = u.user_id
               WHERE rr.product_id = ?`;

  db.query(sql, [productId], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });

    res.json({ success: true, reviews: results });
  });
});

// Deleting a review by ID
router.delete('/delete/:reviewId', (req, res) => {
  const reviewId = req.params.reviewId;

  const deleteQuery = `DELETE FROM rating_review WHERE rating_review_id = ?`;

  db.query(deleteQuery, [reviewId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error while deleting' });

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ success: true, message: 'Review deleted successfully' });
  });
});


module.exports = router;
