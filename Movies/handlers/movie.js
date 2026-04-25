const express = require("express");

// Packages
const { createMovie, updateMovie, deleteMovie, readMovie, findMovieByPublisher, countMoviesByPublisher, } = require("../packages/movies/movies");
const { CreateMovie, UpdateMovie, ValidateMovie } = require("../packages/movies/validation");
const { findPublisherByAccount } = require("../packages/publishers/publishers");
require("../packages/publishers/publishers");

// Handlers
const addMovie = async (request, response) => {
    try {
        await ValidateMovie(request.body, CreateMovie);

        const { title, description, releaseYear, genre } = request.body;

        const publisher = await findPublisherByAccount(request.auth.id);
        if (!publisher)
            return response.status(403).send("You must be logged in to create a movie");

        const newMovie = await createMovie({
            title,
            description,
            releaseYear,
            genre,
            publisherId: publisher._id,
            // NOTE:
            // we use _id when we retrieve from DB, while
            // .id when we retrieve from payload (JWT request)
        });

        // Expansion: movie limiting (impractical)
        // const moviesCount = await countMoviesByPublisher(publisher._id);
        // if (moviesCount >= 30)
        //     return response.status(400).send("Limit exceeded");
        
        return response.status(200).send("Movie created");
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
};

const getMovie = async (request, response) => {
    try {
        const movie = await readMovie(request.params.id);
        // params because we ID comes from user in URL (dynamic parameter - /:id)

        if (!movie) 
            return response.status(400).send("Movie doesn't exist");

        return response.status(200).send(movie);
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
};

const editMovie = async (request, response) => {
    try {
        await ValidateMovie(request.body, UpdateMovie); // first: validate
        
        const publisher = await findPublisherByAccount(request.auth.id); // second: check if publisher's logged
        if (!publisher) 
            return response.status(400).send("Publisher doesn't exist");

        const movie = await readMovie(request.params.id); // third: check if movie exists by searching publisher ref
        if (!movie)
            return response.status(404).send("Movie doesn't exist");

        if (movie.publisherId.toString() !== publisher._id.toString()) // fourth: check if owned by user(publisher)
            return response.status(403).send("You don't own this movie");

        await updateMovie(movie._id, request.body); // fifth: update the movie based on it's ObjectId
        return response.status(200).send("Movie updated"); // then return

        // How this works(^): 
        // Warner Bros logs in -> token -> PUT /movies/someID -> are you a publisher? Yes/No 
        // -> does the movie exist? Yes/No -> do the IDs match (movie.publisherId === Warner Bros publisher._id)
        // -> Allow/Don't allow edit 
        // We use toString() to compare values of same type, because we can't compare objects
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
};

const removeMovie = async (request, response) => {
    try {
        const publisher = await findPublisherByAccount(request.auth.id); // same logic rhytm as editMovie
        if (!publisher) 
            return response.status(400).send("Publisher doesn't exist");

        const movie = await findMovieByPublisher(publisher._id) 
        if (!movie)
            return response.status(404).send("Movie doesn't exist");

        if (movie.publisherId.toString() !== publisher._id.toString())
            return response.status(403).send("You don't own this movie");

        await deleteMovie(movie._id);
        return response.status(200).send("Movie deleted");
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
};

module.exports = { addMovie, getMovie, editMovie, removeMovie };