const fs = require("fs"); // file system acccess (core module)

const readFile = () => {
    return new Promise((resolve, reject) => { // resolve, reject -> 2 status types of Promise (+1: pending)
        fs.readFile("books.json", "utf-8", (error, data) => {
            if(error) reject(error); // if error: send reject + the error message 

            data = JSON.parse(data); // if not, parse data (into objects)
            resolve(data); // if no error: send data to user
        });
    });
}

const writeFile = (data) => {
    return new Promise((resolve, reject) => {
        data = JSON.stringify(data); // turn data string into JSON string
        fs.writeFile("books.json", data, (error) => { // data is to be written in books.json (new object)
            if(error) reject(error); // same principle applies as before
            resolve(); // same principle here as well
        }); // Format data would be written in, if successful: {ime: "Admin", prezime: "Test", godina: 2100}
    });
}

module.exports = {
    readFile,
    writeFile,
}