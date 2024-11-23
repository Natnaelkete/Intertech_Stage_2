import mongoose from "mongoose";

const allBooks = new mongoose.Schema(
  {
    title: String,
    author: String,
    isbn: String,
    publishedYear: String,
  },
  { timestamps: true }
);

const Books = mongoose.model("Books", allBooks);

export default Books;
