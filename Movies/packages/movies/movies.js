const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    publisherId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Publisher", // link to publishers DB collection
    },
}, { timestamps: true });

const Movie = mongoose.model("Movie", movieSchema, "movies");


// CRUD
const createMovie = async (data) => {
    const newMovie = new Movie(data);
    return await newMovie.save();
};

const updateMovie = async (_id, data) => {
    return await Movie.updateOne({ _id }, data);
};

const deleteMovie = async (_id) => {
    return await Movie.deleteOne({ _id });
};

const readMovie = async (_id) => {
    return await Movie.findOne({ _id })
        .populate("publisherId", "name email");
    // .populate() takes all movie fields (title, genre...)
    // from the publisher in the DB
};

const findMovieByPublisher = async (publisherId) => {
    return await Movie.findOne({ publisherId });
};

const countMoviesByPublisher = async (publisherId) => {
    return await Movie.countDocuments({ publisherId });
}

module.exports = { 
    createMovie, updateMovie, 
    deleteMovie, readMovie, 
    findMovieByPublisher, countMoviesByPublisher, 
};