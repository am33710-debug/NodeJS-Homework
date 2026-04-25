// Account Register/Login Validation upon Try by User
const { Validator } = require("node-input-validator");

const RegisterAccount = {
    username: "required|string",
    email: "required|string",
    password: "required|string",
    publisherId: "string",
};

const LoginAccount = {
    email: "string",
    password: "string",
};

const UpdateAccount = {
    username: "string",
    email: "string",
    password: "string",
};

// Function - checks if the inputted data matches the schemas above
const ValidateAccount = async (data, schema) => {
    const validator = new Validator(data, schema);
    const pass = await validator.check(); 

    console.log("Account Validation passed:", pass);

    if(!pass) throw {
        code: 400,
        error: validator.errors,
    };
}

module.exports = { RegisterAccount, LoginAccount, UpdateAccount, ValidateAccount };