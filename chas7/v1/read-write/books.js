const { readFile, writeFile } = require("./fs.js");

const getBooks = () => {
    return readFile(); // no parameters because in readFile the file we read from is declared - books.json
}

const addBook = async (book) => {
    try {
        const books = await readFile(); // read existing books

        books.push(book);
        await writeFile(books);
    } catch (error) {
        console.error("Error adding book:", error);
    }
}
// Add edit/deleteBook functions here manually

module.exports = {
    getBooks,
    addBook,
}