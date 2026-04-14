const express = require("express");
const { read, write } = require("../read-write/read-write");

const addMovie = async (request, response) => {
    try {
        let movies = await read("movies.json");
        movies.push(request.body);
        await write("movies.json", movies);

        return response.status(200).send("Movie added");
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

const readMovies = async (request, response) => {
    try {
        const movies = await read("movies.json");
        return response.status(200).send(movies);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

const readMovie = async (request, response) => {
    try {
        const movies = await read("movies.json");

        const movie = movies.find((movie) => movie.id === Number(request.params.id));

        return response.status(200).send(movie);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

const updateMovie = async (request, response) => {
    try {
        let movies = await read("movies.json");

        const Movies = movies.map((movie) => {
            if (movie.id === Number(request.params.id)) {
                return {
                    ...movie,
                    ...request.body,
                };
            }
            return movie;
        });
        await write("movies.json", Movies);
        return response.status(200).send("Update successful");
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

const deleteMovie = async (request, response) => {
    try {
        let movies = await read("movies.json");

        const Movies = movies.filter((movie) => movie.id !== Number(request.params.id));
        await write("movies.json", Movies);

        return response.status(200).send("Movie deleted successfully");
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

// Custom CRUDs 
const filterByGenre = async (request, response) => {
    try {
        let movies = await read("movies.json");

        const byGenre = movies.filter((movie) => movie.genre === request.query.genre);
        
        return response.status(200).send(byGenre);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

const descendByRating = async (request, response) => {
    try {
        let movies = await read("movies.json");

        const byRating = movies.sort((a, b) => b.rating - a.rating);

        return response.status(200).send(byRating);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

const findByTitle = async (request, response) => {
    try {
        let movies = await read("movies.json");

        const byTitle = movies.find((movie) => movie.title === request.query.title);

        return response.status(200).send(byTitle);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

const filterByReleaseYear = async (request, response) => {
    try {
        let movies = await read("movies.json");

        const byReleaseYear = movies.filter((movie) => movie.releaseYear >= Number(request.params.release));

        return response.status(200).send(byReleaseYear);
    } catch (error) {
        return response.status(500).send("Internal Server Error");
    }
}

module.exports = {
    addMovie, readMovie, readMovies, updateMovie, deleteMovie,
    filterByGenre, descendByRating, findByTitle, filterByReleaseYear,
}