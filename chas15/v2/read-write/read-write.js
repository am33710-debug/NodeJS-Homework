const fs = require("fs");
const { dirname } = require("path");

const path = `${__dirname}/../model/`;

const read = async (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(`${path}${fileName}`, "utf-8", (error, data) => {
            if (error) 
                reject(error);
            data = JSON.parse(data);
            resolve(data);
        });
    });
}

const write = async (fileName, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${path}${fileName}`, JSON.stringify(data, null, 2), (error) => {
            if (error) 
                reject(error);
            resolve();
        });
    })
}

module.exports = { read, write };