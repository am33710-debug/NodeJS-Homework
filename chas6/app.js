const http = require("http");
const url = require("url");

const { handlePerson } = require("./handler/handler.js");

const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);

    // RegExps
    const regexIme = /^[A-Z][a-z]+$/;
    const regexPrezime = /^[A-Z][a-z]+$/;
    const regexEMBG = /^\d{5}$/; 

    switch(parsedUrl.pathname) {
        case "/ime":
            handlePerson(request, response, parsedUrl.query.ime, regexIme);
            break;
        case "/prezime":
            handlePerson(request, response, parsedUrl.query.prezime, regexPrezime);
            break;
        case "/embg":
            handlePerson(request, response, parsedUrl.query.embg, regexEMBG);
            break;
        default: 
            response.writeHead(400, {"Content-Type": "text/plain"});
            response.end(`User Error: Bad Syntax Format`);
    }
});

server.listen(3000, () => console.log("Server started at port 3000"));