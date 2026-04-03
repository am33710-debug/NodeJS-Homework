const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    GPA: Number,
    ID: Number,
    scholarship: Boolean,
}); //{ versionKey: false}

const studentModel = mongoose.model("Student", studentSchema, "students"); // send this schema to the collection students

module.exports = studentModel;

// Does this(line 7) create a new collection? How does it work?
// - modelName(optional), modelSchema, collectionName
// If the collection doesn't exist in MongoDB, it will be automatically created by MongoDB

// Where do we need to modify the URI(connectionString) to access that collection?
// - mongodb+srv://Aki_DB_ExerciseUse:Akii2324!@cluster0.qkcdruf.mongodb.net/?appName=Cluster0                                                                       
// eg: .//test(DB,not collection)?... (between /?) - collection is determined in the model (students eg)