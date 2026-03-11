const { convertMilestoKilometers, fahrenheitToCelsius, poundsToKilograms, feetToMeters } = require("./convert.js"); // object destructuring, better than just variables
const http = require("http"); // core module

// Server (addEventListener, just for backend) - how to create
// const server = http.createServer((request, response) => {
//     response.end("Hello World"); // can be seen at http://localhost:3000 in browser(any)
// });

// server.listen(3000, () => {
//     console.log("Server started at port 3000");
// });


// CRUD - Create, Read, Update, Delete
// HTTP - POST, GET(default), PUT, DELETE (methods)
//const server = http.createServer((request, response) => {
    // console.log(request.method, request.url); // for debugging
    // request.method - HTTP method
    // request.url - route where the resource is located 
    // Both are temp values 
    // .url values must be used in Postman to POST what we want, where we want

    // Only through Postman Software (installed) - testing, primary url: http://localhost:3000/function-name-here
//     if(request.method == "POST" && request.url === "/convert") {
//         let data = "";
//         // .on() attaches a listener to a request event and when an event happens, the following code executes
//         request.on("data", (chunk) => { // chunk is a piece and the data/input is split into chunks and sent in chunks(bits) to our app
//             data += chunk; // every chunk is added to data(empty string) 
//             console.log("Chunk:", chunk);
//         }); // here the server waits for something

//         request.on("end", () => { // actives after data is read by server
//             // JSON.parse/stringify to send JSON format of the data in JS object/JSON objects
//             const parsedData = JSON.parse(data); // parsedData is now an object(manipulable)
//             console.log("Parsed data:", parsedData);
//             // data = {
//             //     miles: 10;
//             // } // How data looks like 

//             const convertedVal = convertMilestoKilometers(parsedData.miles);
//             // console.log(convertedVal);
//             response.writeHead(200, {"content-type": "text/plain"}); // 200 means status OK
//             response.end(`${convertedVal}`); // only strings on output -> send a response to the client and finish the HTTP request
            
//             // .end() sends the final chunk of data and closes the response
//             // CTRL + C to close the server in terminal
//         });
//     } 
    
//     else if(request.method === "POST" && request.url === "/to-celsius") {
//         // input broken down into chunks and sent 1 by 1 to data variable 
//         let data = ""; 
//         request.on("data", (chunk) => {
//             data += chunk; 
//         });

//         // adding the data to a variable 
//         request.on("end", () => {
//             const parsedData = JSON.parse(data);

//             // creating a variable to store the converted values by calling the function to it
//             const convertedVal = fahrenheitToCelsius(parsedData.fahrenheit); // .parameter from function here(in ())
//             // output - if everything is OK
//             response.writeHead(200, {"content-type": "text/plain"});
//             response.end(`${convertedVal}`); 
//         });
//     } 
    
//     else if(request.method === "POST" && request.url === "/to-kilograms") {
//         let data = "";
//         request.on("data", (chunk) => {
//             data += chunk;
//         });

//         request.on("end", () => {
//             const parsedData = JSON.parse(data);

//             const convertedVal = poundsToKilograms(parsedData.pounds);

//             response.writeHead(200, {"content-type": "text/plain"});
//             response.end(`${convertedVal}`);
//         });
//     }

//     else if(request.method === "POST" && request.url === "/to-meters") {
//         let data = "";
//         request.on("data", (chunk) => {
//             data += chunk;
//         });

//         request.on("end", () => {
//             const parsedData = JSON.parse(data);

//             const convertedVal = feetToMeters(parsedData.feet);

//             response.writeHead(200, {"content-type": "text/plain"});
//             response.end(`${convertedVal}`);
//         });
//     }

//     else {
//         // GET - all requests come here, if the conditions above fail
//         response.end("An Error occured, please try again.");
//     } 
// });
// NOTE! - Uncomment only the if/else and the create server above, to avoid chaos(bcz of comments)


// Using switch
const server = http.createServer((request, response) => {
    if(request.method === "POST") {
        let data = "";

        request.on("data", (chunk) => {
            data += chunk;
        });

        request.on("end", () => {
            const parsedData = JSON.parse(data);

            let convertedVal;

            switch(request.url) {
                case "/convert":
                    convertedVal = convertMilestoKilometers(parsedData.miles);
                    break;
                case "/to-celsius":
                    convertedVal = fahrenheitToCelsius(parsedData.fahrenheit);
                    break;
                case "/to-kilograms":
                    convertedVal = poundsToKilograms(parsedData.pounds);
                    break;
                case "/to-meters":
                    convertedVal = feetToMeters(parsedData.feet);
                    break;
                default:
                    return response.end("Route not found."); // returns the end() function and ends the program, so writeHead won't run
                    // break not needed for default: (won't work if you put it there)
            }

            response.writeHead(200, {"content-type": "text/plain"});
            response.end(`${convertedVal}`);
        });
    }
});

 server.listen(3000, () => {
     console.log("Server started at port 3000");
});