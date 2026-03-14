const fs = require("fs"); // file system acccess (core module)
const { getBooks, addBook } = require("./read-write/books.js");

const run = async () => { // must be in a function in order for the code to run, because of await
    try {
        console.log("Current books:\n", await getBooks()); // show the existing books 
        
        await addBook({
            title: "New",
            publisher: "Xyz",
            year: 2018
        }); // wait until complete
        
        console.log("Updated books:\n", await getBooks()); // show the updated books
    } catch (error) {
        console.error("Error:", error);
    }
}

run();

// Questions:
// 1. Right now, when i write the new book into the books.json, it overrides the existing content there,
//    but i want it to appear next in line (appendFile) but in correct JSON format, as now appendFile only
//    pastes is like a string to the last existing element in the JSON file. So that when i read the file 
//    again, it is in a correct JSON format in the terminal (console)
