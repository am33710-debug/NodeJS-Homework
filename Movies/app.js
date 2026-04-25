const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

// Config
const { getSection } = require("./packages/config/index");

// DB
const connect = require("./packages/db/db");
connect();

// Handlers
const { Register, Login } = require("./handlers/authentication"); // Login & Register handling

const {
    addPublisher, getPublisher, editPublisher, removePublisher,
} = require("./handlers/publisher"); // Publisher CRUD handling

const { addMovie, getMovie, editMovie, removeMovie } = require("./handlers/movie"); // Movie CRUD handling

// App Format & Middleware(JWT)
const app = express();
app.use(express.json());
app.use(
    jwt({
        secret: getSection("development").jwt_secret,
        algorithms: ["HS256"],
    }).unless({
        path: ["/auth/register", "/auth/login", { url: "/movies", methods: ["GET"]}, ],
    }),
);
// Important NOTE:
// When using express-jwt: token comes through request.auth.id/_id (depending on how we declare in the jwt.sign)
// so use accordingly
// When using the regular one - JSON Web Token(JWT), it will come differently (not required to know now)

// App Routing

// Authentication
app.post("/auth/register", Register);
app.post("/auth/login", Login);
// Right now, we can only POST and PUT these 2, we can expand further by creating an Admin Panel and allow GET and DELETE for the accounts (expand accounts.js and handlers/configs)


// Protected routes (require authentication - login before accessing + add JWT)

// Publishers (can be expanded with Admin Panel to GET all Publishers)
app.get("/publishers/:id", getPublisher);
app.post("/publishers", addPublisher); 
app.put("/publishers", editPublisher); // no need for params as they use request.auth.id 
app.delete("/publishers", removePublisher); // no need for params as they use request.auth.id 

// Movies
app.get("/movies/:id", getMovie);
app.post("/movies", addMovie);
app.put("/movies/:id", editMovie); 
app.delete("/movies/:id", removeMovie); 

app.listen(getSection("development").port, () => 
    console.log(`Server opened at port ${getSection("development").port}`),
);