const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Account Creation + Validation Functions & "Schemas"
const { createAccount, updateAccount, deleteAccount, readAccountCredentials, findAccountByEmail } = require("../packages/accounts/account");
const { RegisterAccount, LoginAccount, UpdateAccount, ValidateAccount } = require("../packages/accounts/validation");

// Config Access
const { getSection } = require("../packages/config/index");

// Handlers
const Register = async (request, response) => {
    try {
        await ValidateAccount(request.body, RegisterAccount);

        const { username, email, password } = request.body;

        const accountExists = await findAccountByEmail(email);

        if (accountExists)
            return response.status(400).send("Account already exists");

        const data = {
            username, email,
            password: bcrypt.hashSync(password),
        }; // data comes from request.body (user)

        const newAccount = await createAccount(data);
        return response.status(200).send("Account created");
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
};


const Login = async (request, response) => {
    try {
        await ValidateAccount(request.body, LoginAccount);

        const { email, password } = request.body;
        const account = await findAccountByEmail(email);

        if (!account) {
            return response.status(404).send("Account not found");
        }

        if (!bcrypt.compareSync(password, account.password)) {
            await updateAccount(account._id, { loginFail: account.loginFail + 1 });
            return response.status(400).send("Wrong Password");
        }

        // Payload - JSON Web Token
        const payload = {
            username: account.username,
            email: account.email,
            id: account.id,
            publisherId: account.publisherId,
            exp: new Date() / 1000 + 7 * 24 * 60 * 60,
            // The jwt_secret should never be on the payload as it is not encrypted and only serves to validate and sign on the server side
        }; // data comes from DB (as account awaits finding in DB through findAccountByEmail)
        const token = jwt.sign(payload, getSection("development").jwt_secret);

        await updateAccount(account.id, { loginSuccess: account.loginSuccess + 1 }); // Increase counter
        return response.status(200).send({ token }); // Successful Login
        // Use this response (token) to test authentication
    } catch (error) {
        console.log("Error:", error);
        return response.status(500).send("Internal Server Error");
    }
};


module.exports = { Register, Login };