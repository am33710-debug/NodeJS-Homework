const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
  },
  description: {
        type: String
  },
  genre: {
        type: String,
        required: true
  },
  releaseYear: {
        type: Number,
        required: true
  },
  rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
  },
  duration: {
        type: Number // in minutes
  },
  director: {
        type: String
  },
}, {timestamps: true});

const Movie = mongoose.model("Movie", movieSchema, "movies");

// CRUD

const create = async (movieData) => {
    const newMovie = new Movie(movieData);
    return await newMovie.save();
    // or (shorter)
    //return await Movie.create(movieData)
    // or (new versions of mongoose support this as well)
    //await Movie.movies.insertOne(movieData)
}

const read = async () => {
    return await Movie.find();
}

const readOne = async (_id) => {
      return await Movie.findOne({ _id });
} 

const update = async (_id, movieData) => {
    return await Movie.updateOne({ _id }, movieData);
}

const remove = async (_id) => {
    return await Movie.deleteOne({ _id });
}

// Custom CRUDs
const readByGenre = async (genre) => {
      return await Movie.find({ genre });
}

const readTopRated = async () => {
      return await Movie.find().sort({ rating: -1 });
}

const readByTitle = async (titleRegExp) => {
      return await Movie.findOne({
            title: { $regex: titleRegExp, $options: "i" } 
      }); // search by RegExp and case-insensitive - dark, Dark, DARK.. - all matched
}

const readMoviesAfterX = async (year) => {
      return await Movie.find({ releaseYear: { $gt: year }});
}


module.exports = { 
      create, read, readOne, update, remove,
      readByGenre, readTopRated, readByTitle, readMoviesAfterX,
};