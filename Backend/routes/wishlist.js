const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');
const { authenticateToken } = require("./userAuth.js");

router.get('/get-wish', authenticateToken, (req, res) => {
    Wishlist.findOne({ userId: req.headers.id })
        .populate('books')
        .then(wishlist => {
            res.status(200).json({ data: wishlist || { books: [] } });
        })
        .catch(error => {
            console.error('Wishlist fetch error:', error);
            res.status(500).json({ message: 'Internal server error.' });
        });
});

router.post('/add-wish', authenticateToken, (req, res) => {
    const { bookId } = req.body;
    
    if (!bookId) {
        return res.status(400).json({ message: 'Book ID is required.' });
    }

    Wishlist.findOneAndUpdate(
        { userId: req.headers.id },
        { $addToSet: { books: bookId } },
        { new: true, upsert: true }
    )
        .then(wishlist => {
            res.status(200).json({ 
                message: 'Book added to wishlist.',
                data: wishlist 
            });
        })
        .catch(error => {
            console.error('Add to wishlist error:', error);
            res.status(500).json({ message: 'Internal server error.' });
        });
});


router.post('/remove-wish', authenticateToken, (req, res) => {
    const { bookId } = req.body;
    
    if (!bookId) {
        return res.status(400).json({ message: 'Book ID is required.' });
    }

    Wishlist.findOneAndUpdate(
        { userId: req.headers.id },
        { $pull: { books: bookId } }
    )
        .then(() => {
            res.status(200).json({ message: 'Book removed from wishlist.' });
        })
        .catch(error => {
            console.error('Remove from wishlist error:', error);
            res.status(500).json({ message: 'Internal server error.' });
        });
});

module.exports = router;