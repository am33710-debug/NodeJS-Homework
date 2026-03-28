const express = require("express");

const {
    getForm, postForm,
    getStudents, deleteStudents
} = require("./controllers/form-control");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/form", getForm); // read add student table(form) to user (show it to him)
app.post("/form", postForm); // add new student to table(in row/s) (when submit is clicked, redirect to /students)

app.get("/students", getStudents); // read students table (fetch all students)
app.get("/delete", deleteStudents); // remove student/s from table(row/s) (delete by index - request.query.index)

app.listen(3000, () => console.log("Server started at port 3000"));