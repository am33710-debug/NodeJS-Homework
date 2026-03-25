const express = require("express");

const { getAnalysis, postAnalysis } = require("./controller/analysis.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/analysis", getAnalysis); // get text from analysis-form
app.post("/analysis", postAnalysis); // post analysis to analysis.html (after checking)

app.listen(3000, () => { console.log("Server opened at port 3000")});