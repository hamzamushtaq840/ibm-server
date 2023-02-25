const express = require('express');
const router = express.Router();
const Book = require('../models/books');

// Task 1: Get the book list available in the shop.
router.get('/booklist', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Task 2: Get the books based on ISBN.
router.get('/isbn/:isbn', async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Task 3: Get all books by Author.
router.get('/author/:author', async (req, res) => {
    try {
        const books = await Book.find({ author: req.params.author });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Task 4: Get all books based on Title.
router.get('/title/:title', async (req, res) => {
    try {
        const books = await Book.find({ title: { $regex: req.params.title, $options: 'i' } });
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Task 5: Get book Review.
router.get('/reviews/:isbn', async (req, res) => {
    try {
        const book = await Book.findOne({ isbn: req.params.isbn });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book.reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Task 10: Get all books – Using async callback function.
router.get('/all-books', (req, res) => {
    getAllBooks((err, books) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(books);
    });
});

function getAllBooks(callback) {
    Book.find({}, (err, books) => {
        if (err) {
            return callback(err);
        }
        callback(null, books);
    });
}

// Task 11: Search by ISBN – Using Promises.
router.get('/isbn/:isbn', (req, res) => {
    Book.findOne({ isbn: req.params.isbn })
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(book);
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

// Task 12: Search by Author.
router.get('/author/:author', (req, res) => {
    Book.find({ author: req.params.author })
        .then(books => {
            if (!books || books.length === 0) {
                return res.status(404).json({ message: 'No books found for this author' });
            }
            res.json(books);
        })
        .catch(err => res.status(500).json({ message: err.message }));
});

// Task 13: Search by Title.
router.get('/title/:title', (req, res) => {
    Book.find({ title: { $regex: req.params.title, $options: 'i' } })
        .then(books => {
            if (!books || books.length === 0) {
                return res.status(404).json({ message: 'No books found with this title' });
            }
            res.json(books);
        })
        .catch(err => res.status(500).json({ message: err.message }));
});


module.exports = router;