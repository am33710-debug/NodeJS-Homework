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
  createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      //ref: "Account" // fix
  },
}, {timestamps: true}); // versionKey: false in the {} to remove __v: in Document (which is created automatically and keeps track of the version modified in case of $push/pull array mod)

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

const read = async (createdBy) => {
    return await Movie.find({ createdBy });
}

const readOne = async (_id, createdBy) => {
    return await Movie.findOne({ _id, createdBy });
} 

const update = async (_id, createdBy, movieData) => {
    return await Movie.updateOne({ _id, createdBy }, { $set: movieData });
}

const remove = async (_id, createdBy) => {
    return await Movie.deleteOne({ _id, createdBy });
}

// Custom CRUDs
const readByGenre = async (genre, createdBy) => {
    return await Movie.find({ genre, createdBy });
}

const readTopRated = async (createdBy) => {
    return await Movie.find({ createdBy }).sort({ rating: -1 });
}

const readByTitle = async (titleRegExp, createdBy) => {
    return await Movie.findOne({
        title: { $regex: titleRegExp, $options: "i" },
        createdBy
    });
}

const readMoviesAfterX = async (year, createdBy) => {
    return await Movie.find({ releaseYear: { $gt: year }, createdBy });
}


module.exports = { 
      create, read, readOne, update, remove,
      readByGenre, readTopRated, readByTitle, readMoviesAfterX,
};