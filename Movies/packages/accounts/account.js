const mongoose = require("mongoose");

// Schema for User Registration (account doesn't exist - creating a new one)
const accountSchema = mongoose.Schema({ 
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    publisherId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "publishers", // link to another collection - publishers in the Movies DB
    }, // if User publishes a movie, not mandatory, as he can do it after logging in, not registering

    loginSuccess: {
        type: Number,
        default: 0,
    },
    loginFail: {
        type: Number,
        default: 0,
    }, // Counters for Successful and Failed Login Attempts per User (display is in accounts collection directly) - used in the Handlers for users
}, {timestamps: true });

const Account = mongoose.model("Account", accountSchema, "accounts");


// CRUD
const createAccount = async (data) => {
    const newAccount = new Account(data);
    return await newAccount.save();
};

const updateAccount = async (_id, data) => {
    return await Account.updateOne({ _id }, data);
};

const deleteAccount = async (_id) => {
    return await Account.deleteOne({ _id });
};

const readAccountCredentials = async (_id) => {
    return await Account.findOne({ _id })
    .select(
        "-password -_id -__v username email",
    );
};

const findAccountByEmail = async (email) => {
    return await Account.findOne({ email });
}; // For login/register check if the account already exists


module.exports = { createAccount, updateAccount, deleteAccount, readAccountCredentials, findAccountByEmail };