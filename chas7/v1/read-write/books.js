const { readFile, writeFile } = require("./fs.js");

const getBooks = () => {
    return readFile(); // no parameters because in readFile the file we read from is declared - books.json
}

const addBook = async (book) => {
    try {
        const books = await readFile(); // read existing books

        writeFile(book); // add new book to books.json (the file is already declared in the function)
        await writeFile(book); // wait until complete

        return books; // return updated books (with the new addded)
    } catch (error) {
        console.error("Error adding book:", error);
    }
}

module.exports = {
    getBooks,
    addBook,
}