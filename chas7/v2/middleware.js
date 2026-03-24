// Middleware Homework, part of chas8 homework, but added here

// Make middlewares for: (route-specific)
// 1. Get a single book
// 2. Check if year>2000 and pages>300
// 3. Check whether a book has rating> 4.5

const { readFile } = require("./read-write.js");

async function getSingleBook(request, response, next) {
    const books = await readFile();
    const book = books.find(book => book.title.toLowerCase() === request.params.title.toLowerCase());

    if (!book) 
        return response.status(404).send(`Error: Book with title ${request.params.title} wasn't found.`);

    request.book = book; // so other middleware can use this when the program continues, otherwise in every middleware we will have to call it (not good practice)
    next();
}

async function checkBookAgeAndPages(request, response, next) {
    const book = request.book; // already declared in previous middleware, so now we re-use

    if (book.year <= 2000 || book.pages <= 300) // middleware has to either continue, or stop the program to send an error -> point of middlewares
        return response.status(200).send(`Book doesn't meet criteria.`);
    next();
}

async function checkBookRating(request, response, next) {
    const book = request.book;

    if (book.rating <= 4.5) 
        return response.status(200).send("Book's rating isn't above 4.5");
    next();
}

module.exports = { getSingleBook, checkBookAgeAndPages, checkBookRating };