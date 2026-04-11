const mongoose = require("mongoose");

const URI = "mongodb+srv://Aki_DB_ExerciseUse:Akii2324!@cluster0.qkcdruf.mongodb.net/test?appName=Cluster0";

async function connectDB() {
    try {
        await mongoose.connect(URI);
        console.log("Connection to MongoDB Established");
    } catch (error) {
        console.log("Error:", error);
    }
}

module.exports = connectDB;