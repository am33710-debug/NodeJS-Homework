const express = require("express");

// Note:
// Since we use express-jwt, not raw jwt, the data here comes from request.auth not request.account 
// Because we authorize from Postman Authorization Panel, not by login/register (raw)

// Functions and "Schemas" 
const { createPublisher, updatePublisher, deletePublisher, readPublisher, findPublisherByAccount } = require("../packages/publishers/publishers");
const { RegisterPublisher, UpdatePublisher, ValidatePublisher } = require("../packages/publishers/validation");
const { get } = require("mongoose");

// Handlers
const addPublisher = async (request, response) => {
    try {
        await ValidatePublisher(request.body, RegisterPublisher);

        const { name, email } = request.body;

        // This block of code causes 1 user to have only 1 Publisher, as we will think of this program as
        // YouTube or Spotify -> one creator identity per account - Simple 
        const publisherExists = await findPublisherByAccount(request.auth.id);

        if(publisherExists)
            return response.status(400).send("Publisher already exists");

        const newPublisher = await createPublisher({
            name, 
            email,
            accountId: request.auth.id,
        });
        return response.status(200).send("Publisher created");
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
};

const getPublisher = async (request, response) => {
    try {
        const publisher = await readPublisher(request.params.id);

        if(!publisher)
            return response.status(400).send("Publisher doesn't exist");

        return response.status(200).send(publisher);
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
};

const editPublisher = async (request, response) => {
    try {
        await ValidatePublisher(request.body, UpdatePublisher);

        const publisher = await findPublisherByAccount(request.auth.id);

        if(!publisher)
            return response.status(400).send("Publisher doesn't exist");

        await updatePublisher(publisher.id, request.body);
        return response.status(200).send("Publisher updated");
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
};

const removePublisher = async (request, response) => {
    try {
        const publisher = await findPublisherByAccount(request.auth.id);

        if(!publisher)
            return response.status(400).send("Publisher doesn't exist");

        await deletePublisher(publisher.id);
        return response.status(200).send("Publisher deleted");
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
};


module.exports = {
    addPublisher, getPublisher, editPublisher, removePublisher,
};