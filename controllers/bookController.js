import asyncHandler from "../middleware/asyncHandler.js";
import Books from "../models/bookModel.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Books.find({});

    if (!books || books.length === 0) {
      res.status(200).json([]);
    }

    res.status(200).json(books);
  } catch (error) {
    console.log("from GetBooks", error);
  }
};

export const addBook = asyncHandler(async (req, res) => {
  try {
    const { title, author, isbn, publishedYear } = req.body;
    const books = await Books.findOne({ title });

    if (books) {
      return res.status(400).json({ message: "This book is already added" });
    }

    const newBook = new Books({
      title,
      author,
      isbn,
      publishedYear,
    });

    await newBook.save();

    res.status(201).json(newBook);
  } catch (error) {
    console.error("from addBooks", error);
  }
});

export const updateBook = asyncHandler(async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const { title, author, isbn, publishedYear } = req.body;
    const book = await Books.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: "There is no book like this" });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.isbn = isbn || book.isbn;
    book.publishedYear = publishedYear || book.publishedYear;

    const updateBook = await book.save();

    res.status(200).json({
      id: updateBook._id,
      title: updateBook.title,
      author: updateBook.author,
      publishedYear: updateBook.publishedYear,
      isbn: updateBook.isbn,
    });
  } catch (error) {
    console.log("From updateBook", error);
  }
});

export const deleteBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const books = await Books.findById(bookId);

    if (!books) {
      return res.status(400).json({ message: "Unable to delete" });
    }

    await books.deleteOne();

    res.status(200).json({ message: "Book is deleted successfully" });
  } catch (error) {
    console.log("from deleteBooks", error);
  }
};

export const getRecommendation = asyncHandler(async (req, res) => {
  try {
    const books = await Books.find().limit(3);

    res.status(200).json(books);
  } catch (error) {
    console.log("from getRecommendation", error);
  }
});

export const addToFavorite = asyncHandler(async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const books = await Books.findById(bookId);
    console.log(books);

    const preExistingBook = books.favorite.includes(bookId);
    console.log(preExistingBook);

    if (preExistingBook) {
      return res
        .status(400)
        .json({ message: "The book is already added to favorite" });
    }

    books.favorite.push(bookId);

    await books.save();

    res.status(200).json({ message: "Book successfully added to favorite" });
  } catch (error) {
    console.log("from addToFavorite", error);
  }
});
