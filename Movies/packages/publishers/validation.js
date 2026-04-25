const { Validator } = require("node-input-validator");

const RegisterPublisher = {
    name: "required|string",
    email: "required|email",
};

const UpdatePublisher = {
    name: "string",
    email: "email",
};

const ValidatePublisher = async (data, schema) => {
    const validator = new Validator(data, schema);
    const passed = await validator.check();

    console.log("Publisher Validation passed:", passed);

    if (!passed) throw {
        code: 400,
        error: validator.errors,
    };
};

module.exports = { RegisterPublisher, UpdatePublisher, ValidatePublisher };

// Note:
// Here we don't use accountId as that comes from the JWT - request.account