const fs = require("fs");

const readFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("books.json", "utf-8", (error, data) => {
            if (error) reject(error);
            data = JSON.parse(data);
            resolve(data);
        });
    });
}

const writeFile = (data) => {
    return new Promise((resolve, reject) => {
        data = JSON.stringify(data);
        fs.writeFile("books.json", data, (error) => {
            if (error) reject(error);
            resolve();
        });
    });
}

module.exports = { readFile, writeFile };