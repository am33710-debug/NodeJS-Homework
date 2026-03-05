const fs = require("fs"); // file system commands access
const { readFile, appendFile, writeFile } = require("./file.js");

// writeFile("file.txt", "John Doe\n")
//     .then((resolve) => console.log(resolve))
//     .catch((error) => console.log(error));

// readFile("file.txt")
//     .then((resolve) => console.log(resolve))
//     .catch((error) => console.log(error));

// appendFile("file.txt", "John Doe, 25 year")
//     .then((resolve) => console.log(resolve))
//     .catch((error) => console.log(error));

// readFile("file.txt")
//     .then((resolve) => console.log(resolve))
//     .catch((error) => console.log(error));
// // Order of execution chaos - because everything runs at once and JS doesn't know which is done executing
// Fix: (with async function(await))

// async function run() {
//     try {
//         await writeFile("file.txt", "John Doe\n");
//         let read = await readFile("file.txt");
//         console.log(read);

//         await appendFile("file.txt", "John Doe, 25 year");
//         read = await readFile("file.txt");
//         console.log(read);

//     } catch(error) {
//         console.log(error);
//     }
// }
// run();



// Other task:
// 1. Сите студенти од Скопје чие име завршува на а и имаат просек над 7, подредени по име (растечки).
// 2. Сите студенти кои имаат просек над 9 и не се од Скопје, подредени по просек опаѓачки.
// 3. Првите 3 студенти кои имаат имиња од 5 карактери, подредени по просек.
const studenti = [
  { ime: "Bojan", prosek: 7.5, grad: "Skopje" },
  { ime: "Pero", prosek: 8.3, grad: "Bitola" },
  { ime: "Janko", prosek: 6.9, grad: "Bitola" },
  { ime: "Vesna", prosek: 9.2, grad: "Skopje" },
  { ime: "Elena", prosek: 9.9, grad: "Kumanovo" },
  { ime: "Vancho", prosek: 10, grad: "Tetovo" },
  { ime: "Elena", prosek: 9.9, grad: "Ohrid" },
  { ime: "Ivana", prosek: 6.9, grad: "Kumanovo" },
  { ime: "Natasha", prosek: 8.1, grad: "Skopje" },
  { ime: "Stanko", prosek: 7.2, grad: "Strumica" },
];
// Order:
// We can use filter() to take filter out the elements using conditions 
// Then sort() them using 2 temp elements
// For the last task, we can use slice to only affect the first three elements
// Then we print out

const sortedStudents = studenti
    .filter(s => s.grad === "Skopje" && s.ime[s.ime.length-1] === "a" && s.prosek > 7) // get necessary elements - s.ime(this is the name of student[s.ime(this is the number of characters).length-1]
    .sort((a,b) => {
        if(a.ime < b.ime) return -1; // move back
        if(a.ime > b.ime) return 1; // move forward
        return 0; // don't move (element sorted)
    });
console.log("Task 1:", sortedStudents);

const outOfSkopje = studenti
    .filter(s => s.prosek > 9 && s.grad !== "Skopje") 
    .sort((a,b) => b.prosek - a.prosek); // descending order sort 
console.log("Task 2:", outOfSkopje);

const firstThree = studenti
    .filter(s => s.ime.length === 5)
    .sort((a,b) => b.prosek - a.prosek) // descending order sort
    .slice(0, 3); // first 3 elements - indexes: 0,1,2 (3 elements)
console.log("Task 3:", firstThree);



// Important Notice:
// .then().catch() is the same as try,catch, they do the same thing, just in modern
// codebases, try and catch method is used more often, the only difference is how they're
// written, so always use try/catch