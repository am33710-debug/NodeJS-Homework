1 - This is an exercise backend-only project which does the following:
- Accounts for Users
- Publishers who make Movies
- The Movies themselves
* All Stored in a separate DB

2 - To use it, users must register/login to add/join movies
3 - Function/code definitions in files 

* To test in front of instructor:
Login: 
{
    "email": "admin@a24films.com",
    "password": "A24Films123!"
}

GET/PUT: 
http://localhost:3000/movies/69eca4560683d10937401ff8


* NOTES:
When to use the following:

1 - request.params.id (WHO they're TARGETING):

Comes from the URL, identifies what resource is being targeted - id, title, name, email...
When to use: GET /movies/abc6665 -> abc6665 is request.params.id which goes in readMovie() to find a specific movie

2 - request.auth.id (WHO is ASKING):

Comes from the Token payload

3 - document._id (WHAT database DOCUMENT):

Comes from MongoDB, indentifies a specific document and returns it
When to use: after fetching a document, use its _id for more DB operations 
Example: 
const movie = await readMOvie(request.params.id);
await updateMovie(movie._id, request.body); -> update THIS SPECIFIC MOVIE with the content from request.body

4 - document.id

Same thing as ._id but is returned as a string
When to use: when signing JWTs or comparing with/without toString() (===)
Example: jwt.sign({ id: account.id }, secret);