const express = require("express");

const app = express();
app.use(express.json());

// In-memory books
let books = [
  { id: 1, title: "Book One", author: "Author A" },
  { id: 2, title: "Book Two", author: "Author B" },
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET one book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  res.json(book);
});

// CREATE a book
app.post("/books", (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author are required" });
  }

  const newBook = {
    id: books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1,
    title,
    author,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// UPDATE a book
app.put("/books/:id", (req, res) => {
  const { title, author } = req.body;
  const book = books.find((b) => b.id === parseInt(req.params.id));

  if (!book) return res.status(404).json({ message: "Book not found" });

  book.title = title ?? book.title;
  book.author = author ?? book.author;

  res.json(book);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex((b) => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1)[0];

  res.json({ message: "Book deleted", deletedBook });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
