const fs = require("fs");

const getAnalysis = async (request, response) => {
    try {
        const analysis = await parseTemplate("analysis-form"); // take info/data from analysis-form.html
        return response.status(200).send(analysis); // return the analysis(data)
    } catch (error) {
        return response.status(500).send(`Internal Server Error`);
    }
}

const postAnalysis = async (request, response) => {
    try {
        const text = request.body.text; 

        if (!text) 
            return response.status(400).send("Bad Request");

        
        // Count total characters in the text, .length counts every character including spaces
        const charNumber = text.length;
        
        // trim(remove) white spaces first
        // split text into an array of individual words by using a regex to split by whitespaces(1 or more)
        const words = text.trim().split(/\s+/);
        const wordNumber = words.length;
        
        // Filter words array, test each word against vowelRegex, count how many pass
        const vowelRegex = /^[аоуиеАОУИЕ]/u; // RegExp (Cyrillic)
        const vowelWord = words.filter(w => vowelRegex.test(w)).length; // reuse words from before + .length at end takes the length at end
        
        // Split text at .!? (that's where sentences end) then filter for whitespaces/blanks
        const sentenceNumber = text.split(/[.!?]+/).filter(word => word.trim().length > 0).length;
        // Eg: "Hello.  How are you? " -> 3 blanks, 2 after . 1 after ?
        // "Hello".length > 0 is true
        // "  How are you".length > 0 is also true, 
        // " " is left at end, using word.trim().length fixes this
        // " " gets filtered out, so we only have: "Hello.  How are you?"

        // Filter words by chars - <5 >5 =5
        const wordNumberEqual5 = words.filter(word => word.length === 5).length;
        const wordNumberSmaller5 = words.filter(word => word.length < 5).length;
        const wordNumberBigger5 = words.filter(word => word.length > 5).length;
        // Use five not 5

        // All results into one object, variable names match the {{}} placeholders in analysis.html
        const data = { charNumber, wordNumber, vowelWord, sentenceNumber, wordNumberEqual5, wordNumberSmaller5, wordNumberBigger5 };
        
        // Data into parseTemplate which replaces the {{}} placeholders in analysis.html, then send it
        const analysis = await parseTemplate("analysis", data);
        return response.status(200).send(analysis);

    } catch (error) {
        return response.status(500).send(`Internal Server Error`);
    }
}

const parseTemplate = async (template, data = null) => { // data is null by default, for example: no previous interaction = null
    return new Promise((resolve, reject) => {
        const path = `${__dirname}/../view/${template}.html`; // exit current file directory, go into controller/analysis.js
        fs.readFile(path, "utf-8", (error, content) => {
            if (error) reject(error);

            if(data) // Beware: data is an argument for the function (request.body), with the local variable content, we manipulate it
                for (const i in data) 
                    content = content.replace(`{{${i}}}`, data[i]);
            resolve(content); // return content to data
        });
    });
} // This function is used to read and replace the html in analysis.html after input in analysis-form.html

module.exports = { getAnalysis, postAnalysis };