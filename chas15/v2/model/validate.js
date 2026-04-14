const { Validator } = require("node-input-validator");


const movieCreate = {
    title: "required|string",
    description: "required|string",
    genre: "required|string",
    releaseYear: "required|integer",
    rating: "required|decimal",
    duration: "required|integer",
    director: "required|string",
};

const movieUpdate = {
    title: "string",
    description: "string",
    genre: "string",
    releaseYear: "integer", // we can also add: |min:1|max:10
    rating: "decimal", // we can also add: |min:1|max:10
    duration: "integer",
    director: "string",
};


// Main function - validation
const validateMovie = async (data, schema) => {
    const validator = new Validator(data, schema);
    const passed = await validator.check(); // returns boolean if/if not an error exists

    console.log("Error:", passed);

    if(!passed) throw {
        code: 400,
        error: validator.errors,
    };
}

module.exports = { movieCreate, movieUpdate, validateMovie };