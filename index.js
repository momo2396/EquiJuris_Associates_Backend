// essential imports
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000

// routes and functions import
const { client } = require('./functions/databaseClient')
const usersRoute = require('./routes/users')
const casesRoute = require('./routes/cases')
const blogsRoute = require('./routes/blogs')

// middleware configuration
app.use(express.json());
app.use(cors());


// main function
let run = async () => {
    await client.db("equiJurisAssociates").command({ ping: 1 });
    app.use('/users', usersRoute)
    app.use('/blogs', blogsRoute)
    app.use('/cases', casesRoute)
    app.get('/', (req, res) => { res.send("Welcome to EquiJuris Associate server.") })
}

// main function calling
run().catch(err => {
    console.log(err);
})


// server listener
app.listen(port, () => {
    client.connect(err => {
        if (err) console.log(err);
        else console.log('DB connection established')
    });
    console.log(`listening on ${port}`);
});