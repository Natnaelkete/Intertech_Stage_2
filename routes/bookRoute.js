import express from "express";

import {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
  getRecommendation,
  addToFavorite,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/books", getBooks);
router.get("/books/recommendation", getRecommendation);
router.post("/books/:id", addToFavorite);
router.post("/books", addBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;
