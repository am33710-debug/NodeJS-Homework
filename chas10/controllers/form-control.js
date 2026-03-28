const CRUD = require("../models/crud");

// Form handler - when info about new student is added, how it is read and where it goes
const getForm = (request, response) => {
    response.render("students-form"); // display content from this file
}

const postForm = async (request, response) => {
    const { firstName, lastName, GPA } = request.body;

    const students = { // turn the user input into an object that is sent to students.json
        firstName: firstName,
        lastName: lastName,
        GPA: GPA,
    };
    await CRUD.addStudent(students);
    response.redirect("/students"); // redirect from /form -> /students page upon completion of action
}

const getStudents = async (request, response) => {
    const students = await CRUD.listStudents();
    response.render("students", {students}); // when that button is clicked, render content from students
}

const deleteStudents = async (request, response) => {
    await CRUD.removeStudent(request.query.index);
    response.redirect("/students"); // upon deletion, redirect to /students, even if on that page it looks like a refresh
}

module.exports = {
    getForm, postForm,
    getStudents, deleteStudents,
};