const express = require('express');
const app = express();
const port = 3000;
import mongoose from 'mongoose'
const Book = require('./book');

mongoose.connect("mongodb+srv://hello:Mk2UGFVdxmNCvhpV@fullstackhero.2rjab.mongodb.net/")
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// A temporary in-memory "database" until you integrate a real database
let books = [];

// Create a Book
app.post('/books', async (req, res) => {
    try {
      let book = new Book({ title: req.body.title, author: req.body.author });
      book = await book.save();
      res.send(book);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });

// Get All Books
app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.send(books);
  });

// Get a Single Book
app.get('/books/:id', async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (!book) return res.status(404).send('Book not found');
      res.send(book);
    } catch (err) {
      res.status(500).send('Something went wrong');
    }
  });

// Update a Book
app.put('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, { title: req.body.title, author: req.body.author }, { new: true });
    if (!book) return res.status(404).send('Book not found');
    res.send(book);
  });

// Delete a Book
app.delete('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) return res.status(404).send('Book not found');
    res.status(204).send();
  });