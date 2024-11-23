import Books from "../models/bookModel.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Books.find({});

    if (!books) {
      res.status(200).json([]);
    }

    res.status(200).json(books);
  } catch (error) {
    console.log("from GetBooks", error);
  }
};

export const addBook = async (req, res) => {
  try {
    const { title, author, isbn, publishedYear } = req.body;
    const books = await Books.findOne({ title });
    console.log(books);

    if (books) {
      res.status(400).json({ error: "Book with this title already exists" });
      return; // Ensure no further code executes
    }

    const newBook = new Books({
      title,
      author,
      isbn,
      publishedYear,
    });

    await newBook.save();

    res.status(201).json(newBook); // Use status 201 for created resources
  } catch (error) {
    console.error("from addBooks", error);

    // Send a proper error response
    res.status(500).json({ error: "An error occurred while adding the book" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const books = await Books.findById(bookId);

    if (!books) {
      res.status(404);
      throw new Error("Unable to delete");
    }

    await books.deleteOne();

    res.status(200).json({ message: "Book is deleted successfully" });
  } catch (error) {
    console.log("from deleteBooks", error);
  }
};
