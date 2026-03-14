// Function to validate input 
function handlePerson(request, response, value, RegExp) {
    // value => /ime?ime=Andrej, regExp => rule that value will have to follow
    if(value && RegExp.test(value)) { // we also check value of response, because if only 3000/ime -> program crash
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end(`Hi ${value}`);
    } else {
        response.writeHead(400, {"Content-Type": "text/plain"});
        response.end(`User Error: Bad Syntax Format`);
    } 
}

module.exports = {
    handlePerson,
}