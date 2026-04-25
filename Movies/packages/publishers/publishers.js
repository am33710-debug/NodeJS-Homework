const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    accountId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "accounts", // reference to accounts collection (doesn't come from request.body!)
        required: true,
    },
}, { timestamps: true });

const Publisher = mongoose.model("Publisher", publisherSchema, "publishers");

// CRUD
const createPublisher = async (data) => {
    const newPublisher = new Publisher(data);
    return await newPublisher.save();
};

const updatePublisher = async (_id, data) => {
    return await Publisher.updateOne({ _id }, data);
};

const deletePublisher = async (_id) => {
    return await Publisher.deleteOne({ _id });
};

const readPublisher = async (_id) => {
    return await Publisher.findOne({ _id })
        .populate("accountId", "username email");
};

const findPublisherByAccount = async (accountId) => {
    return await Publisher.findOne({ accountId });
};

module.exports = { createPublisher, updatePublisher, deletePublisher, readPublisher, findPublisherByAccount };