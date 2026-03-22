const { readFile, writeFile } = require("./read-write.js");

const readBooks = async (request, response) => {
    const books = await readFile();
    return response.status(200).send(books); // return the books in the server response
}

const addBook = async (request, response) => {
    const books = await readFile();

    books.push(request.body); // push the elements in the requests' body into books (as books in an array of objects - JSON format)
    await writeFile(books);
    return response.status(200).send("Book added successfully.");
}

const editBook = async (request, response) => {
    const bookData = request.body;
    const bookIndex = Number(request.params.bookIndex);

    let books = await readFile(); // let, not const, because its values will be changed - we edit/add

    books = books.map((book, index) => {
        if (index === bookIndex) {
            return {
                ...book,
                ...bookData,
            } // return the book(we edit) and its new values
        }
        return book; // return again in order to avoid null as output
    });
    await writeFile(books);
    return response.status(200).send(`Book with index ${bookIndex} has been successfully edited.`);
}

const deleteBook = async (request, response) => {
    let books = await readFile();
    const bookIndex = Number(request.params.bookIndex);

    books = books.filter((_, index) => index !== bookIndex); // remove the book from books
    await writeFile(books);

    return response.status(200).send(`Book with index ${bookIndex} has been deleted successfully.`);
}

// For middleware handling 
const sendBook = async (request, response) => {
    const books = await readFile();
    const book = books.find(book => book.title.toLowerCase() === request.params.title.toLowerCase());

    return response.status(200).send(`Book ${request.params.title} meets all criteria.`); // if all middlewares pass, return the book content and that it has passed
}

module.exports = { readBooks, addBook, editBook, deleteBook, sendBook };