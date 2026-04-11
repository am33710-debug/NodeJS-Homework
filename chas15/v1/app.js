const express = require("express");
const mongoose = require("mongoose");

// DB
const connect = require("../v1/db/config");
connect();

// Handlers
const { 
    createMovie, readMovies, readMovie, updateMovie, deleteMovie,
    filterByGenre, topByRating, findByTitle, filterByReleaseyear,
 } = require("../v1/controller/movieHandlers");

// App routing
const app = express();
app.use(express.json());

// Using queries (first come these because if the come second, MongoDB crashes due to dynamic arguments - :id)
app.get("/movies/genre", filterByGenre); // get movies by genre
app.get("/movies/rating", topByRating); // get top-rated movies (sort by highest first)
app.get("/movies/title", findByTitle); // search movies by title: dark finds Dark Knight (Batman)

app.get("/movies/release/:year", filterByReleaseyear); // get movies released after year X -> /w params

app.get("/movies", readMovies);
app.get("/movies/:id", readMovie); 

app.post("/movies", createMovie);
app.put("/movies/:id", updateMovie);
app.delete("/movies/:id", deleteMovie);

app.listen(3000, () => console.log("Server is listening at port 3000"));