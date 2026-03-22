const express = require("express");

const { readBooks, addBook, editBook, deleteBook, sendBook } = require("./handler.js");

const {getSingleBook, checkBookAgeAndPages, checkBookRating } = require("./middleware.js");

const app = express();
app.use(express.json());

const port = 3000;

app.get("/books", readBooks); // if a specific route isn't provided
app.get("/books/:title", getSingleBook, checkBookAgeAndPages, checkBookRating, sendBook); // if route-specific (/:title)

app.post("/books", addBook);
app.put("/books/:bookIndex", editBook);
app.delete("/books/:bookIndex", deleteBook);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});