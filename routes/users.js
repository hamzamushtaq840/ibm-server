const express = require('express');
const router = express.Router();
const User = require('../models/users');
const Book = require('../models/books');

// Task 6: Register New user.
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Task 7: Login as a Registered user.
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login Successful' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Registered Users:

// Task 8: Add/Modify a book review.
router.post('/:userId/reviews/:isbn', async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const existingReview = book.reviews.find(review => review.userId === req.params.userId);
        if (existingReview) {
            console.log('found');
            existingReview.rating = req.body.rating;
            existingReview.comment = req.body.comment;
        } else {
            book.reviews.push({
                userId: req.params.userId,
                user: req.body.name,
                rating: req.body.rating,
                comment: req.body.comment,
            });
        }

        await book.save();
        res.json({ message: "record successfully updated", newRecord: book.reviews });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Task 9: Delete book review added by that particular user.
router.delete('/:userId/reviews/:isbn', async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const existingReview = book.reviews.find(review => review.userId === req.params.userId);
        if (!existingReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        book.reviews = book.reviews.filter(review => review.user !== req.params.userId);
        await book.save();
        res.json({ message: "record deleted successfully", newRecord: book.reviews });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;