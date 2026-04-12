const express = require("express");

const { create, 
    read, 
    readOne, 
    update, 
    remove, 
    readByGenre,
    readTopRated, 
    readByTitle, 
    readMoviesAfterX
} = require("../model/movies");

// CRUD Handlers
const createMovie = async (request, response) => {
    try {
        const newMovie = await create(request.body);
        return response.status(200).send("New Movie Successfully Created");
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
}

const readMovies = async (request, response) => {
    try {
        const displayMovies = await read();
        return response.status(200).send(displayMovies);
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
}

const readMovie = async (request, response) => {
    try {
        const displayMovie = await readOne(request.params.id);
        return response.status(200).send(displayMovie);
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
}

const updateMovie = async (request, response) => {
    try {
        const updatedMovie = await update(request.params.id, request.body);
        return response.status(200).send(`Movie with ID:${request.params.id} successfully updated`);
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
}

const deleteMovie = async (request, response) => {
    try {
        const removeMovie = await remove(request.params.id);
        return response.status(200).send(`Movie with ID:${request.params.id} successfully deleted`);
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
}

// Custom CRUD Handlers
const filterByGenre = async (request, response) => {
    try {
        const filterGenre = await readByGenre(request.query.genre);
        return response.status(200).send(filterGenre);
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
}

const descendByRating = async (request, response) => {
    try {
        const topMovies = await readTopRated();
        return response.status(200).send(topMovies);
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
}

const findByTitle = async (request, response) => {
    try {
        const findMovie = await readByTitle(request.query.title);
        return response.status(200).send(findMovie);
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
}

const filterByReleaseYear = async (request, response) => {
    try {
        const findMovies = await readMoviesAfterX(request.params.year);
        return response.status(200).send(findMovies);
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
}


module.exports = {
    createMovie, readMovies, readMovie, updateMovie, deleteMovie,
    filterByGenre, descendByRating, findByTitle, filterByReleaseYear,
};