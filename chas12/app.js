const mongoose = require("mongoose"); // no express

const studentModel = require("./students");

const URI = "mongodb+srv://Aki_DB_ExerciseUse:Akii2324!@cluster0.qkcdruf.mongodb.net/test?appName=Cluster0";
// .env requires a separate npm package + lines of code to add


// Connection Function
const connectDB = () => {
    try {
        mongoose.connect(URI); 
        console.log("Connected");
    } catch (error) {
        console.log("Error:", error);
    }
} 
connectDB(); 


// CRUD Function
//const CRUD = async () => { // comment out the create/update/delete to avoid duplicates/unwanted things
    // Create
    // const newStudent = new studentModel({
    //     firstName: "Aki",
    //     lastName: "Akievski",
    //     GPA: 8.8,
    //     ID: 123321,
    //     scholarship: true,
    // }); // in a real program, values will be taken from the UI(frontend)
    // await newStudent.save(); // wait for the DB to save the new user, view result on MongoDB

    // Note: when a mongoose object is created, __v: 0 will be added as an extra parameter for 
    // internal version key to track document updates (0 is default for new documents)
    // Removable: add { versionKey: false} after the closing }, for the Schema

    // Read (same syntax as in MongoDB Shell)
    // const findStudent = await studentModel.findOne({ firstName: "Aki" });
    // console.log("Found Student:", findStudent);

    // Update
    // const updateStudent = await studentModel.updateOne(
    //     { _id: "69cfe02adcf48813b128fa70"}, // Student: Marko Stojanov 
    //     { $set: { scholarship: false}}, // change scholarship status true -> false
    // ); 
    // view result on MongoDB

    // Delete
    // const deleteStudent = await studentModel.deleteOne(
    //     { _id: "69cfe02adcf48813b128fa72"} // Student: Nikola Kostov
    // ); 
    // view result on MongoDB
// }
// CRUD(); 


// Custom Calls to DB Function
// GPT generated ideas (/w & /wo logical operators)
const customQueries = async () => { 
    // Find students with GPA above 9 AND have a scholarship
    // const goodStudents = await studentModel.find(
    //     { $and: [
    //         { GPA: { $gte: 9}},
    //         { scholarship: true},
    //     ]},
    // );
    // console.log("Found some good students:", goodStudents);


    // Delete all students who have GPA < 5
    // try {
    //     const removeBadStudents = await studentModel.deleteMany(
    //         { GPA: { $lte: 5}},
    //     );
    //     console.log("Removed all the bad students");
    // } catch (error) {
    //     console.log("Error:", error);
    // } // try/catch for security


    // Find all students with GPA between 9 and 10
    // const exceptionalStudents = await studentModel.find(
    //     { GPA: { $gte: 9, $lte: 10}},
    // );
    // console.log("Found the best students:", exceptionalStudents);


    // Find students whose firstName starts with "A" or lastName ends with "ski" (use RegExp here)
    const regexFirstName = new RegExp("^A"); // , i - for case-insensitive (optional) (both RegExps)
    const regexLastName = new RegExp("ski$");

    const customStudents = await studentModel.find(
        { $or: [
            { firstName: regexFirstName },
            { lastName: regexLastName },
        ]},
    );
    console.log("Students:", customStudents);
}
customQueries();