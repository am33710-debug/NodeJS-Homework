// Da se napishat 10 razlichni izrazi po zhelba, primer: Tel. broj, adresa...
// Isprobaj barem 1 na Postman so POST method

// Server URL: http://localhost:3000
const http = require("http");

const handler = (request, response) => {
    if(request.method === "POST") {
        let data = ""; // where the information(data) will be stored (this variable) from POST
        
        // we request the body from POST in Postman
        request.on("data", (chunk) => {
            data += chunk; // this is a string now, we need to JSON parse it down the line
        });
        
        request.on("end", () => {
            // RegExp samples
            //const phoneNumber = RegExp("\+\d{3} \d{3}\-\d{3}\-\d{3}");
            //const address = RegExp("[A-Za-z]+\, [A-Za-z]+ [A-Za-z]+ number\.\d+\, \d{4}");
            //const url = RegExp("^(http|https)\:\/\/www\.[A-Za-z0-9-]+\.[A-Za-z0-9-]{2,}$"); // short url, not full -> http(s)://www.google.com, nothing else
            // doesn't work(^)

            // const regexes = {
            //     "phone number": "/^\+\d{3} \d{3}-\d{3}-\d{3}$/",
            //     "address": "/^[A-Za-z]+, [A-Za-z]+ [A-Za-z]+ number\.\d+, \d{4}$/",
            //     "url": "/^(http|https):\/\/www\.[A-Za-z0-9-]+\.[A-Za-z]{2,}$/"
            // };
            // Experiment(^)
            const phoneNumber = /^\+\d{3} \d{3}-\d{3}-\d{3}$/;
            const address = /^[A-Za-z]+, [A-Za-z]+ [A-Za-z]+ number\.\d+, \d{4}$/;
            const url = /^(http|https):\/\/www\.[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

            // The type of the sample(manipulable) in JSON format in Postman to await response from the server 
            const { type, sample } = JSON.parse(data); // data sent to Postman in JSON format, manipulable

            // Function that checks if valid
            const validate = (regExp, sample, name) => { // name = type name - Phone Number, Adress... as we get an invalid format output for type 
                if(regExp.test(sample)) {
                        response.writeHead(200, {"Content-Type": "text/plain"});
                        response.end(`Sample ${sample} is valid for ${name} format.`);
                    } else {
                        response.writeHead(400, {"Content-Type": "text/plain"})
                        response.end(`Sample ${sample} is NOT valid for ${name} format.`);
                    } // Status 200 = successful response, 400 = bad response (bad syntax)
            }

            switch (type) {
                case "Phone Number":
                case "phone number":
                    //console.log("Received sample:", JSON.stringify(sample)); // for debugging
                    validate(phoneNumber, sample, "Phone Number");
                    break;

                case "Address":
                case "address":
                    //console.log("Received sample:", JSON.stringify(sample));
                    validate(address, sample, "Address");
                    break;

                case "Url":
                case "URL":
                case "url":
                    //console.log("Received sample:", JSON.stringify(sample));
                    validate(url, sample, "URL");
                    break;
                
                default: 
                    response.writeHead(400, {"Content-Type": "text/plain"});
                    response.end("Unknown validation type");
                    break;
            }
        });
    }
}

const server = http.createServer(handler); // create server and assign the handler to it(less code, better writing)

server.listen(3000, () => { // start server by running index.js (node filename)
    console.log("Server started at port 3000");
});