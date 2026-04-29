================================================================================
  MOVIES API - PROJECT README
  Node.js + Express + MongoDB (Mongoose) REST API
================================================================================
 
WHAT THIS PROJECT IS
--------------------
A backend REST API for managing movies and publishers, with user authentication
baked in. Think of it like a mini YouTube or Spotify — one account, one
publisher identity, and that publisher can post movies. Pretty clean setup
honestly.
 
 
--------------------------------------------------------------------------------
PACKAGES USED
--------------------------------------------------------------------------------
 
  express             The web framework. Handles routing, middleware, req/res.
  mongoose            ODM for MongoDB. Lets you define schemas and talk to the DB
                      like you're working with regular JS objects.
  jsonwebtoken        Signs and verifies JWTs manually (used in Login handler).
  express-jwt         Middleware that automatically validates JWTs on protected
                      routes. Decodes the token and puts the payload on req.auth.
  bcryptjs            Hashes passwords before saving, and compares them on login.
  node-input-validator  Validates request body fields against defined rules
                        (required, string, integer, email, etc.).
 
 
--------------------------------------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------------------------------------
 
  app.js                        Entry point. Sets up Express, JWT middleware,
                                and all routes.
 
  handlers/
    authentication.js           Register and Login logic.
    publisher.js                Publisher CRUD handlers.
    movie.js                    Movie CRUD handlers.
 
  packages/
    config/
      config.json               Holds environment configs (port, DB credentials,
                                JWT secret) for development / staging / live.
      index.js                  Reads config.json once and exports getSection().
 
    db/
      db.js                     Connects to MongoDB Atlas using Mongoose.
 
    accounts/
      account.js                Account Mongoose schema + CRUD functions.
      validation.js             Validation rule sets for register/login/update.
 
    movies/
      movies.js                 Movie Mongoose schema + CRUD functions.
      validation.js             Validation rule sets for create/update movie.
 
    publishers/
      publishers.js             Publisher Mongoose schema + CRUD functions.
      validation.js             Validation rule sets for register/update publisher.
 
 
--------------------------------------------------------------------------------
SCHEMAS (Mongoose)
--------------------------------------------------------------------------------
 
  --- Account (accounts collection) ---
    username      String, required, unique
    email         String, required, unique
    password      String, required (stored hashed via bcrypt)
    publisherId   ObjectId, ref -> publishers (optional, links account to publisher)
    loginSuccess  Number, default 0 (tracks successful logins)
    loginFail     Number, default 0 (tracks failed login attempts)
    timestamps    createdAt / updatedAt auto-added by Mongoose
 
  --- Publisher (publishers collection) ---
    name          String, required
    email         String, required, unique
    accountId     ObjectId, required, ref -> accounts (links publisher to its account)
    timestamps    createdAt / updatedAt auto-added
 
  --- Movie (movies collection) ---
    title         String, required, unique
    description   String, required
    releaseYear   Number, required
    genre         String, required
    publisherId   ObjectId, ref -> Publisher (links movie to its publisher)
    timestamps    createdAt / updatedAt auto-added
 
 
--------------------------------------------------------------------------------
CONFIG  (packages/config/)
--------------------------------------------------------------------------------
 
  config.json
    Holds three environment blocks: development, staging, live.
    Each has: port, MONGO_USERNAME, MONGO_PASSWORD, jwt_secret.
    NOTE: This file is committed as-is in this project (exercise context).
    In a real project, keep credentials out of git — use .env instead.
 
  getSection(section)
    Reads config.json once (cached in memory), then returns the block you ask
    for. Usage: getSection("development").port → 3000.
 
 
--------------------------------------------------------------------------------
DATABASE CONNECTION  (packages/db/db.js)
--------------------------------------------------------------------------------
 
  connectDB()
    Builds the MongoDB Atlas URI from config credentials and calls
    mongoose.connect(). Called once at app startup in app.js.
 
 
--------------------------------------------------------------------------------
AUTHENTICATION  (handlers/authentication.js)
--------------------------------------------------------------------------------
 
  Register
    Validates the request body against RegisterAccount rules.
    Checks if an account with that email already exists — if yes, 400.
    Hashes the password with bcrypt, then saves the new account to MongoDB.
    Returns 200 "Account created".
 
  Login
    Validates the request body against LoginAccount rules.
    Looks up the account by email — if not found, 404.
    Compares the submitted password against the stored hash using bcrypt.
    If wrong password: increments loginFail counter, returns 400.
    If correct: builds a JWT payload (username, email, id, publisherId, expiry),
    signs it with the jwt_secret, increments loginSuccess counter,
    returns the token as { token: "..." }.
    This token goes in the Authorization header for all protected requests.
 
 
--------------------------------------------------------------------------------
ACCOUNTS  (packages/accounts/)
--------------------------------------------------------------------------------
 
  account.js — CRUD functions:
 
    createAccount(data)           Saves a new Account document to MongoDB.
    updateAccount(_id, data)      Updates an account by its _id.
    deleteAccount(_id)            Deletes an account by its _id.
    readAccountCredentials(_id)   Returns an account without exposing password,
                                  _id, or __v fields.
    findAccountByEmail(email)     Finds an account by email. Used in login/register
                                  to check existence.
 
  validation.js — rule sets:
 
    RegisterAccount   username, email, password are required strings.
                      publisherId is optional string.
    LoginAccount      email and password are optional strings (loose, for UX).
    UpdateAccount     All fields optional strings.
    ValidateAccount(data, schema)
                      Runs the data against whatever schema you pass in.
                      Throws an error with validation details if it fails.
 
 
--------------------------------------------------------------------------------
PUBLISHERS  (packages/publishers/ + handlers/publisher.js)
--------------------------------------------------------------------------------
 
  publishers.js — CRUD functions:
 
    createPublisher(data)           Saves a new Publisher document.
    updatePublisher(_id, data)      Updates a publisher by _id.
    deletePublisher(_id)            Deletes a publisher by _id.
    readPublisher(_id)              Finds a publisher by _id and populates the
                                    linked account's username and email.
    findPublisherByAccount(accountId)
                                    Finds the publisher linked to a given account.
                                    Used everywhere to check "who is this user?"
                                    from the JWT payload.
 
  validation.js — rule sets:
 
    RegisterPublisher   name required string, email required valid email.
    UpdatePublisher     Both optional.
    ValidatePublisher(data, schema)   Same pattern as ValidateAccount.
 
  handlers/publisher.js:
 
    addPublisher        Validates input, checks if the logged-in user already has
                        a publisher (one per account rule), then creates one using
                        accountId from request.auth (JWT payload).
 
    getPublisher        Looks up a publisher by the ID in the URL params and
                        returns it with the linked account info populated.
 
    editPublisher       Finds the publisher tied to the logged-in account, validates
                        the new data, then updates it. No need for :id in the URL
                        because we know who you are from the JWT.
 
    removePublisher     Same idea — finds your publisher from the JWT, deletes it.
 
 
--------------------------------------------------------------------------------
MOVIES  (packages/movies/ + handlers/movie.js)
--------------------------------------------------------------------------------
 
  movies.js — CRUD functions:
 
    createMovie(data)               Saves a new Movie document.
    updateMovie(_id, data)          Updates a movie by _id.
    deleteMovie(_id)                Deletes a movie by _id.
    readMovie(_id)                  Finds a movie by _id and populates the
                                    publisher's name and email.
    findMovieByPublisher(publisherId)
                                    Finds one movie belonging to a given publisher.
    countMoviesByPublisher(publisherId)
                                    Counts how many movies a publisher has. Not
                                    currently used but ready if you want to add
                                    a movie limit feature.
 
  validation.js — rule sets:
 
    CreateMovie   title, description, genre required strings; releaseYear required integer.
    UpdateMovie   All fields optional.
    ValidateMovie(data, schema)   Same pattern as the others.
 
  handlers/movie.js:
 
    addMovie        Validates input, checks the user has a publisher profile,
                    then creates the movie with the publisher's _id attached.
 
    getMovie        Fetches a movie by URL param :id. No auth required — 
                    GET /movies is public. Returns the movie with publisher info.
 
    editMovie       Multi-step ownership check:
                    1. Validate input.
                    2. Find publisher from JWT.
                    3. Find the movie by :id.
                    4. Compare movie.publisherId === publisher._id (toString() both
                       because you can't compare ObjectId objects directly).
                    5. Update if all good, 403 if you don't own it.
 
    removeMovie     Same ownership check flow as editMovie, then deletes the movie.
 
 
--------------------------------------------------------------------------------
ROUTING SUMMARY  (app.js)
--------------------------------------------------------------------------------
 
  PUBLIC (no token needed):
    POST  /auth/register      Create a new account.
    POST  /auth/login         Log in and receive a JWT.
    GET   /movies             (implied public — no auth on GET /movies endpoint,
                               only GET /movies/:id has a handler but the path
                               exemption covers it)
 
  PROTECTED (JWT required in Authorization header):
    GET    /publishers/:id    Get a publisher by ID.
    POST   /publishers        Create your publisher profile.
    PUT    /publishers        Update your publisher profile.
    DELETE /publishers        Delete your publisher profile.
 
    GET    /movies/:id        Get a movie by ID.
    POST   /movies            Add a new movie (requires publisher profile).
    PUT    /movies/:id        Edit a movie you own.
    DELETE /movies/:id        Delete a movie you own.
 
  JWT Middleware Note:
    Uses express-jwt. The decoded token payload lands on request.auth, not
    request.user. So when the handlers grab the logged-in user's ID, they use
    request.auth.id — keep that in mind if you extend the project.
 
 
================================================================================