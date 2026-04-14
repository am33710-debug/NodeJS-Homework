const express = require("express");

// Handlers/Controllers
const {
    addMovie, readMovie, readMovies, updateMovie, deleteMovie,
    filterByGenre, descendByRating, findByTitle, filterByReleaseYear,
} = require("../v2/handler/handler");

// App
const app = express();
app.use(express.json());

// Routing (first come the static routes, then parameterized(dynamic) ones, otherwise API breaks down)
app.get("/movies", readMovies);
app.get("/movies/genre", filterByGenre); // query
app.get("/movies/title", findByTitle); // query
app.get("/movies/rating/:rating", descendByRating); // params
app.get("/movies/release/:release", filterByReleaseYear);
app.get("/movies/:id", readMovie);

app.post("/movies", addMovie);
app.put("/movies/:id", updateMovie);
app.delete("/movies/:id", deleteMovie);

app.listen(3000, () => console.log("Server opened at port 3000"));
