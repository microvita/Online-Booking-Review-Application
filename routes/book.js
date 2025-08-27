import { Router } from "express";
import fetch from "node-fetch";

const router = Router();

// Async function using callback
function getAllBooks(callback) {
  fetch("http://localhost:5000/")
    .then((response) => response.json())
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
}

router.get("/books", (req, res) => {
  getAllBooks((error, bookList) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error retrieving book list" });
    }
    res.json(bookList);
  });
});

// Function that returns a Promise
function getBookByISBN(isbn) {
  return fetch(`http://localhost:5000/books/${isbn}`).then((response) =>
    response.json()
  );
}

// Route using Promises
router.post("/books/byISBN", (req, res) => {
  const { isbn } = req.body;

  getBookByISBN(isbn)
    .then((book) => {
      res.json(book);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error retrieving book by ISBN" });
    });
});

// Function that returns a Promise
function getBooksByAuthor(author) {
  return fetch(`http://localhost:5000/books/author/${author}`).then(
    (response) => response.json()
  );
}

// Route using Promises
router.post("/books/byAuthor", (req, res) => {
  const { author } = req.body;

  getBooksByAuthor(author)
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error retrieving books by author" });
    });
});

// Function that returns a Promise
function getBooksByTitle(title) {
  return fetch(`http://localhost:5000/books/title/${title}`).then((response) =>
    response.json()
  );
}

// Route using Promises
router.post("/books/byTitle", (req, res) => {
  const { title } = req.body;

  getBooksByTitle(title)
    .then((books) => {
      res.json(books);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error retrieving books by title" });
    });
});

export default router;
