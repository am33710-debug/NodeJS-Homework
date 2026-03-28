const fs = require("fs");

// Add and Read Data, nothing else - assists in form-control functionalities

// Functional part - Read/WriteFile
const readFile = async (fileName) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, "utf-8", (error, data) => {
            if(error) reject(error);
            data = JSON.parse(data);
            resolve(data);
        });
    });
}

const writeFile = async (fileName, data) => {
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, (error) => {
            if(error) reject(error);
            resolve();
        });
    });
}

// Students CRUD - Main Part

const addStudent = async (data) => {
    let students = await readFile("students.json");
    students.push(data);
    await writeFile("students.json", students);
}

const removeStudent = async (index) => {
    let students = await readFile("students.json")
    students = students.filter((_, idx) => Number(index) !== idx);
    await writeFile("students.json", students);
}

const listStudents = async () => {
    return await readFile("students.json");
}

module.exports = {
    readFile, writeFile,
    addStudent, removeStudent,
    listStudents,
}