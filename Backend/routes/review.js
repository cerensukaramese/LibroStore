const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const { authenticateToken } = require("./userAuth.js")

router.get('/get-review/:bookId', async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'name');
        res.status(200).json({ data: reviews });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/add-review', authenticateToken, async (req, res) => {
    try {
        const { bookId, rating, comment } = req.body;
        const review = new Review({
            userId: req.headers.id,
            bookId,
            rating,
            comment
        });
        await review.save();
        res.status(201).json({ message: 'Review added successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
