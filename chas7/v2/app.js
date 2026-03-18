const express = require("express");

const { readBooks, addBook, editBook, deleteBook } = require("./handler.js");

const app = express();
app.use(express.json());

const port = 3000;

app.get("/books", readBooks);
app.post("/books", addBook);
app.put("/books/:bookIndex", editBook);
app.delete("/books/:bookIndex", deleteBook);

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});