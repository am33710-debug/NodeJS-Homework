const fs = require("fs"); // file system acccess (core module)
const { getBooks, addBook } = require("./read-write/books.js");

const run = async () => { // must be in a function in order for the code to run, because of await
    try {
        let readBooks = await getBooks();
        console.log("Current books:\n", readBooks); // show the existing books 
        
        await addBook({
            title: "Blabla",
            publisher: "Xyz",
            year: 2018
        }); // wait until complete
        
        readBooks = await getBooks();
        console.log("Updated books:\n", readBooks); // show the updated books
    } catch (error) {
        console.error("Error:", error);
    }
}

run();