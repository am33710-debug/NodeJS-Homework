const fs = require("fs"); // file system commands access

const readFile = (fileName) => {
    return new Promise((success, fail) => {
        fs.readFile(fileName, "utf-8", (err, data) => { 
            if(err) fail(err); 
            success(data);
        }); 
    }); 
}
// How it works:
// the variable is a function which asks for fileName as parameter and then returns a Promise class with success, fail functions in its constructor
// using the fs.readFile function from the fs core module we ask for the fileName to read from and in utf-8 which is standard character encoding format 
// and we control error handling, if we find an error, the fail function shows the error, if not, the success function shows the data

const writeFile = (fileName, data) => {
    return new Promise((success, fail) => {
        fs.writeFile(fileName, data, (err) => {
            if(err) fail(err);
            success("Name added.");
        });
    });
}
// How it works:
// same thing, just using the writeFile command we write data onto the file - the data is added in script.js to the file of our choosing(fileName) and handling the error/success

const appendFile = (fileName, data) => {
    return new Promise((success, fail) => {
        fs.appendFile(fileName, data, (err) => {
            if(err) fail(err);
            success("Data appended.");
        })
    });
}
// How it works:
// same thing here, just using the appendFile command we append the data(which is what we add in script.js) to the fileName(file of our choosing) and the handle the error/success

module.exports = {
    readFile,
    writeFile,
    appendFile,
};