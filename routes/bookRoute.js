import express from "express";

import {
  getBooks,
  addBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/addBook", addBook);
router.delete("/deletePost", deleteBook);

export default router;
