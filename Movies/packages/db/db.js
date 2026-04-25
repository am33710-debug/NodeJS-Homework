const mongoose = require("mongoose");

const { getSection } = require("../config/index");
const { MONGO_USERNAME, MONGO_PASSWORD } = getSection("development");
// Alawys use getSection for things like these(^)

const URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.qkcdruf.mongodb.net/Movies?appName=Cluster0`;

async function connectDB() {
    try {
        mongoose.connect(URI);
        console.log("Connection to MongoDB established");
    } catch (error) {
        console.log("Error:", error);
    }
}

module.exports = connectDB;