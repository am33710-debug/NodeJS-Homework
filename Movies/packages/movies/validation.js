const { Validator } = require("node-input-validator");

const CreateMovie = {
    title: "required|string",
    description: "required|string",
    releaseYear: "required|integer",
    genre: "required|string",
};

const UpdateMovie = {
    title: "string",
    description: "string",
    releaseYear: "integer",
    genre: "string",
};


const ValidateMovie = async (data, schema) => {
    const validator = new Validator(data, schema);
    const passed = await validator.check();

    console.log("Movie Validation passed:", passed);

    if (!passed) throw {
        code: 400,
        error: validator.errors,
    };
};

module.exports = { CreateMovie, UpdateMovie, ValidateMovie };